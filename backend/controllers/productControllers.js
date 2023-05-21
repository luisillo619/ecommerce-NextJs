import Product from "../models/product";
import APIFilters from "../utils/APIFilters";
import { uploads } from "../utils/cloudinary";
import ErrorHandler from "../utils/errorHandler";

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
    return res.status(404).json({
      error: "producto no encontrado",
    });
  }
  res.status(200).json({
    product,
  });
};

export const uploadProductImages = async (req, res, next) => {
  let product = await Product.findById(req.query.id);
  if (!product) {
    return res.status(404).json({
      error: "producto no encontrado",
    });
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

  product = await Product.findByIdAndUpdate(req.query.id, {
    $push: {
      images: {
        $each: urls,
      },
    },
  }, { new: true });

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
