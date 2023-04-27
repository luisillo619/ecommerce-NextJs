import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
      tax_rates: ["txr_1MyhZkFYyjM4gsmIwRJmgkOL"], //id de impuesto de stripe
      quantity: item.quantity,
    };
  });

  const shippingInfo = body?.shippingInfo; // direccion de envio

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
        shipping_rate: "shr_1MyhjnFYyjM4gsmIlHamJpSa", // id tarifa de envio de stripe
      },
    ],
    line_items,
  });

  res.status(200).json({
    url: session.url, // url de pago. Una vez completado el pago va a redirigir a suscess_url o a cancel_url
  });
};
