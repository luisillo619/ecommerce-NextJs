import { isMongoId } from "../../src/helpers/helpers";
import Product from "../models/product";
import APIFilters from "../utils/APIFilters";

// validacion desde la coleccion
export const newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    product,
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
  const id = req.query.id;
  isMongoId(id, res);

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({
      error: "producto no encontrado",
    });
  }
  res.status(200).json({
    product,
  });
};
