// Clase APIFilters para aplicar filtros de búsqueda, filtrado y paginación a las consultas de Mongoose
class APIFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // Método para aplicar filtro de búsqueda por palabra clave
  search() {
    if (this.queryStr.keyword) {
      this.query = this.query.find({
        name: {
          $regex: this.queryStr.keyword,
          $options: "i",
        },
      });
    }
    return this;
  }

  // Método para aplicar filtros adicionales como precio y calificación
  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "page"];
    removeFields.forEach((field) => delete queryCopy[field]);

    const filterQuery = Object.entries(queryCopy).reduce(
      (acc, [key, value]) => {
        if (key.match(/\b(gt|gte|lt|lte)/)) {
          const [prop, operator] = key.split("[");
          const op = operator.slice(0, -1);
          acc[prop] = { ...acc[prop], [`$${op}`]: value };
        } else {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
    // { price: { $gte: 100, $lte: 1000 } }
    this.query = this.query.find(filterQuery);
    return this;
  }

  // Método para aplicar paginación a la consulta
  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIFilters;
