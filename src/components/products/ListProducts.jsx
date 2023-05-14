import ProductItem from "./ProductItem";
import Filters from "../layouts/Filters";
import CustomPagination from "../layouts/CustomPagination";
import { useState } from "react";
import { SyncLoader } from "react-spinners";

const ListProducts = ({ data }) => {
  const { products, resPerPage, filteredProductsCount } = data;
  const [loading, setLoading] = useState(false);

  return (
    <section className="py-12">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row -mx-4">
          <Filters />

          <main className="md:w-2/3 lg:w-3/4 px-3">
            {!loading ? (
              <>
                {products?.map((product) => (
                  <ProductItem key={product?._id} product={product} />
                ))}
              </>
            ) : (
              <>
                <div className="flex justify-center items-center flex-col h-3/4">
                  <SyncLoader color={"#365ad6"} size={25} />
                  <h2 className="mt-4 text-lg font-semibold text-blue-600">
                    Cargando productos...
                  </h2>
                </div>
              </>
            )}

            <CustomPagination
              resPerPage={resPerPage}
              productsCount={filteredProductsCount}
              loading={loading}
              setLoading={setLoading}
            />
          </main>
        </div>
      </div>
    </section>
  );
};

export default ListProducts;
