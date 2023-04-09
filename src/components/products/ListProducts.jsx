import ProductItem from "./ProductItem";
import Filters from "../layouts/Filters";
import CustomPagination from "../layouts/CustomPagination";

// los dos start rings son los que me dan error
const ListProducts = ({ data }) => {
  return (
    <section className="py-12">
      <div className="container max-w-screen-xl mx-auto px-4 ">
        <div className="flex flex-col md:flex-row -mx-4 ">
          <Filters />

          <main className="md:w-2/3 lg:w-3/4 px-3">
            {data["products"]?.map((product) => (
              <ProductItem key={product?._id} product={product} />
            ))}
            <CustomPagination
              resPerPage={data.resPerPage}
              productsCount={data.filteredProductsCount}
            />
          </main>
        </div>
      </div>
    </section>
  );
};

export default ListProducts;
