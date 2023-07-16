import getRawBody from "raw-body";
import Stripe from "stripe";
import Order from "../models/order";
import APIFilters from "../utils/APIFilters";
import ErrorHandler from "../utils/errorHandler";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getOrders = async (req, res) => {
  const resPerPage = 4;
  const ordersCount = await Order.find().countDocuments();

  const apiFilters = new APIFilters(Order.find(), req.query).pagination(
    resPerPage
  );

  const orders = await apiFilters.query.find().populate("shippingInfo user");

  res.status(200).json({
    ordersCount,
    resPerPage,
    orders,
  });
};

export const getOrder = async (req, res) => {
  const order = await Order.findById(req.query.id).populate(
    "shippingInfo user"
  );

  if (!order) {
    return next(new ErrorHandler(`Orden ${req.query.id} no encontrada`, 404));
  }

  res.status(200).json({
    order,
  });
};

export const updateOrder = async (req, res) => {
  let order = await Order.findById(req.query.id);
  if (!order) {
    return next(new ErrorHandler(`Orden ${req.query.id} no encontrada`, 404));
  }

  order = await Order.findByIdAndUpdate(req.query.id, {
    orderStatus: req.body.orderStatus,
  });

  res.status(200).json({
    success: true,
    order,
  });
};

export const deleteOrder = async (req, res) => {
  let order = await Order.findById(req.query.id);
  if (!order) {
    return next(new ErrorHandler(`Orden ${req.query.id} no encontrada`, 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
};

export const myOrders = async (req, res) => {
  const resPerPage = 2;
  const ordersCount = await Order.find({ user: req.user._id }).countDocuments();

  const apiFilters = new APIFilters(Order.find(), req.query).pagination(
    resPerPage
  );

  const orders = await apiFilters.query
    .find({ user: req.user._id })
    .populate("shippingInfo user");

  res.status(200).json({
    ordersCount,
    resPerPage,
    orders,
  });
};

export const canReview = async (req, res) => {
  const productId = req.query.productId;

  const orders = await Order.find({
    user: req?.user?._id,
    "orderItems.product": productId,
  });

  let canReview = orders?.length >= 1 ? true : false;

  res.status(200).json({
    canReview,
  });
};

export const checkoutSession = async (req, res) => {
  const body = req.body;

  const line_items = body?.items.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [
            item?.image
              ? item?.image
              : "https://res.cloudinary.com/drkzjxpza/image/upload/v1681937562/buyitnow/default%20images/default_product_ylwgzm.png",
          ],
          metadata: { productId: item.product },
        },
        unit_amount: item.price * 100,
      },
      tax_rates: [process.env.STRIPE_TAX_RATE], //id de impuesto de stripe
      quantity: item.quantity,
    };
  });

  // En lugar de solo pasar el ID, se debe proporcionar toda la información de la dirección al crear la orden. En el webhook, se deben agregar directamente los datos de la dirección al momento de crear la orden, en lugar de hacer referencia a la dirección en el esquema de las órdenes con el id

  const shippingInfo = body?.shippingInfo; // id direccion de envio, DESPUES desde el front pasar toda la direccion y no solo el id

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${process.env.CLIENT_URL}/profile/orders?order_success=true`,
    cancel_url: process.env.CLIENT_URL,
    customer_email: req?.user?.email,
    client_reference_id: req?.user?._id,
    mode: "payment",
    metadata: { shippingInfo },
    shipping_options: [
      {
        shipping_rate: process.env.STRIPE_SHIPPING_RATE, // id tarifa de envio de stripe
      },
    ],
    line_items,
  });

  res.status(200).json({
    url: session.url, // PARA ABRIRL EL MODAL DE STRIPE
  });
};

async function getCartItem(item) {
  const product = await stripe.products.retrieve(item.price.product);
  const productId = product.metadata.productId;

  return {
    product: productId,
    name: product.name,
    price: item.price.unit_amount_decimal / 100,
    quantity: item.quantity,
    image: product.images[0],
  };
}

async function getCartItems(line_items) {
  const cartItemPromises = line_items?.data?.map((item) => getCartItem(item));
  return await Promise.all(cartItemPromises);
}

// Esta ruta se manda a llamar automáticamente desde la terminal por el webHook
export const webhook = async (req, res) => {
  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const line_items = await stripe.checkout.sessions.listLineItems(
        event.data.object.id
      );

      const orderItems = await getCartItems(line_items);
      const userId = session.client_reference_id;
      const amountPaid = session.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
        amountPaid,
        taxPaid: session.total_details.amount_tax / 100,
      };

      const orderData = {
        user: userId,
        shippingInfo: session.metadata.shippingInfo,
        paymentInfo,
        orderItems,
      };

      const order = await Order.create(orderData);

      res.status(201).json({ success: true });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error });
  }
};
