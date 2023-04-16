import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

const CustomPagination = ({ resPerPage, productsCount }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [existProduct,setExistProduct] = useState(true)

  let page = searchParams.get("page") || 1;
  page = Number(page);

  let queryParams;

  const handlePageChange = (currentPage) => {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);

      if (queryParams.has("page")) {
        queryParams.set("page", currentPage);
      } else {
        queryParams.append("page", currentPage);
      }

      const path = window.location.pathname + "?" + queryParams.toString();
      router.push(path);
    }
  };

  useEffect(() => {
    if (page * resPerPage > productsCount) {
      queryParams = new URLSearchParams(window.location.search);
      if (queryParams.has("page")) {
        queryParams.set("page", 1);
      } else {
        queryParams.append("page", 1);
      }
      const path = window.location.pathname + "?" + queryParams.toString();
      router.push(path);
    }
    if (Number(productsCount) === 0) {
      setExistProduct(false)
    }
  }, [
    searchParams.get("page"),
    searchParams.get("ratings"),
    searchParams.get("category"),
    searchParams.get("max"),
    searchParams.get("min"),
    searchParams.get("search"),
  ]);

  return (
    // renderizar un cartelito de que no hay productos, ver otros
    <div className="flex mt-20 justify-center">
      <Pagination
        activePage={page}
        itemsCountPerPage={resPerPage}
        totalItemsCount={productsCount}
        onChange={handlePageChange}
        nextPageText={"Next"}
        prevPageText={"Prev"}
        firstPageText={"First"}
        lastPageText={"Last"}
        itemClass="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        activeLinkClassName="z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600 focus:z-20"
        activeClass="z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600 focus:z-20"
      />
    </div>
  );
};

export default CustomPagination;
// Puede comprobar si filteredProductsCount es menor que resPerPage, establezca el valor de página en 1.