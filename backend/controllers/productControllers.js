import { isMongoId } from "../helpers/helpers";
import Product from "../models/product";
import APIFilters from "../utils/APIFilters";

export const newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    product,
  });
};

export const getProducts = async (req, res, next) => {
  const resPerPage = 3;
  const productsCount = await Product.countDocuments();

  // APLICANDO FILTROS
  const apiFilters = new APIFilters(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFilters.query; // productos con filtros
  const filteredProductsCount = products.length;

  // APLICANDO FILTRO DE PAGINACION
  apiFilters.pagination(resPerPage);

  products = await apiFilters.query.clone(); // productos con filtros + filtro de paginacion

  res.status(200).json({
    productsCount, // cantidad de productos sin filtro
    resPerPage, // cantidad de productos que se va a mostrar en cada pagina
    filteredProductsCount, // cantidad de productos con los filtros, sin los filtros de paginacion

    products, // productos con filtros + filtro de paginacion (solo son 3)
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
