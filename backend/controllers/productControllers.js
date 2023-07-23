import Joi from "joi";
import Product from "../models/product";
import APIFilters from "../utils/APIFilters";
import { cloudinary, uploads } from "../utils/cloudinary";
import ErrorHandler from "../utils/errorHandler";

const productSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "El nombre es requerido",
  }),
  description: Joi.string().required().messages({
    "string.empty": "La descripción es requerida",
  }),
  price: Joi.number().required().messages({
    "string.empty": "El precio es requerido",
  }),
  category: Joi.string().required().messages({
    "string.empty": "La categoría es requerida",
  }),
  seller: Joi.string().required().messages({
    "string.empty": "El vendedor es requerido",
  }),
  stock: Joi.number().required().messages({
    "string.empty": "El stock es requerido",
  }),
});

// validacion desde la coleccion
export const newProduct = async (req, res, next) => {
  req.body.user = req.user._id;

  const product = await Product.create(req.body);

  res.status(201).json({
    product,
    success: true,
  });
};

// Función para obtener productos con filtros y paginación.
export const getProducts = async (req, res, next) => {
  const resPerPage = 4; // Número de resultados por página
  const productsCount = await Product.countDocuments(); // Contar todos los productos sin filtros

  // Crear una instancia de APIFilters y aplicar filtros de búsqueda y filtrado
  const apiFilters = new APIFilters(Product.find(), req.query)
    .search()
    .filter();

  // Clonar la consulta y contar los productos después de aplicar los filtros (sin paginación)
  const countQuery = apiFilters.query.clone();
  const filteredProductsCount = await countQuery.countDocuments();

  // Aplicar paginación y ejecutar la consulta final para obtener productos
  const products = await apiFilters.pagination(resPerPage).query.exec();

  res.status(200).json({
    productsCount, // Cantidad total de productos sin filtros
    resPerPage, // Número de resultados por página
    filteredProductsCount, // Cantidad de productos después de aplicar filtros (sin paginación)
    products, // Productos filtrados y paginados
  });
};

export const getProduct = async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("producto no encontrado", 404));
  }
  res.status(200).json({
    product,
  });
};

export const uploadProductImages = async (req, res, next) => {
  let product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("producto no encontrado", 404));
  }

  const urls = [];

  if (req.files.length > 0) {
    const uploader = async (buffer) =>
      await uploads(buffer, "buyitnow/products");

    const files = req.files;

    for (let file of files) {
      const buffer = file.buffer;
      const newPath = await uploader(buffer);
      urls.push(newPath);
    }
  } else {
    return next(new ErrorHandler("Debes agregar por lo menos una imagen", 401));
  }

  product = await Product.findByIdAndUpdate(
    req.query.id,
    {
      $push: {
        images: {
          $each: urls,
        },
      },
    },
    { new: true }
  );

  res.status(200).json({
    data: urls,
    product,
    success: true,
  });
};

// export const uploadProductImages = async (req, res, next) => {
//   let product = await Product.findById(req.query.id);
//   if (!product) {
//     return res.status(404).json({
//       error: "producto no encontrado",
//     });
//   }

//   const urls = [];

//   if (req.files.length > 0) {
//     const uploader = async (buffer) =>
//       await uploads(buffer, "buyitnow/products");

//     const files = req.files;

//     for (let file of files) {
//       const buffer = file.buffer;
//       const newPath = await uploader(buffer);
//       urls.push(newPath);
//     }
//   } else {
//     return next(new ErrorHandler("Debes agregar por lo menos una imagen", 401));
//   }

//   product = await Product.findByIdAndUpdate(req.query.id, {
//     images: urls,
//   });

//   res.status(200).json({
//     data: urls,
//     product,
//     success: true,
//   });
// };

// LOCAL
// export const uploadProductImages = async (req, res, next) => {
//   const uploader = async (buffer) => await uploads(buffer, "buyitnow/products");

//   const urls = []
//   const files = req.files;

//   for(file of files){
//     const {path} = file
//     const newPath = await uploader(path)
//     urls.push(newPath)

//   }
// };

export const updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("producto no encontrado", 404));
  }

  const { error } = productSchema.validate(req.body);
  if (error) {
    return next(
      new ErrorHandler(
        error.details.map((detail) => detail.message).join(", "),
        400
      )
    );
  }

  product = await Product.findByIdAndUpdate(req.query.id, req.body);

  res.status(200).json({
    product,
    success: true,
  });
};

export const deleteProduct = async (req, res, next) => {
  let product = await Product.findById(req.query.id);
  if (!product) return next(new ErrorHandler("producto no encontrado", 404));

  const imageIds = product.images.map((image) => image.public_id);
  await Promise.all(
    imageIds.map((imageId) => cloudinary.v2.uploader.destroy(imageId))
  );

  await product.deleteOne();

  res.status(200).json({
    product,
    success: true,
  });
};

export const createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req?.user?._id,
    rating: Number(rating),
    comment,
  };

  let product = await Product.findById(productId);
  console.log(product);
  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  const isReviewed = product?.reviews?.find(
    (r) => r?.user?.toString() === req?.user?._id.toString()
  );

  if (isReviewed) {
    product?.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product?.reviews.push(review);
  }

  product.ratings =
    product?.reviews?.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product?.save();

  res.status(200).json({
    success: true,
  });
};