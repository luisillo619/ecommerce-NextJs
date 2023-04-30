import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";

const CustomPagination = ({ resPerPage, productsCount }) => {
  const router = useRouter();
  const { page: pageParam, ...restSearchParams } = router.query;

  const page = Number(pageParam) || 1;

  const handlePageChange = (selectedItem) => {
    const currentPage = selectedItem.selected + 1;
    const newSearchParams = new URLSearchParams(restSearchParams);
    newSearchParams.set("page", currentPage);
    router.push({
      pathname: router.pathname,
      search: newSearchParams.toString(),
    });
  };

  useEffect(() => {
    const totalPages = Math.ceil(productsCount / resPerPage);

    if (productsCount > 0 && (page > totalPages || page < 1)) {
      handlePageChange({ selected: page > totalPages ? totalPages - 1 : 0 });
    }
  }, [
    router.query.ratings,
    router.query.category,
    router.query.max,
    router.query.min,
    router.query.search,
  ]);

  if (productsCount === 0) {
    return <div>No hay productos disponibles.</div>;
  }

  return (
    <div className="flex mt-10 justify-center">
      <ReactPaginate
        pageCount={Math.ceil(productsCount / resPerPage)}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        forcePage={page - 1}
        previousLabel={"Anterior"}
        nextLabel={"Siguiente"}
        breakLabel={"..."}
        containerClassName={"flex items-center"}
        pageClassName={"px-4 py-2 mx-1 border rounded"}
        activeClassName={"bg-blue-600 border text-white"}
        breakClassName={"px-4 py-2 mx-1"}
        previousClassName={"px-4 py-2 mx-1 border rounded"}
        nextClassName={"px-4 py-2 mx-1 border rounded"}
        disabledClassName={"opacity-50 cursor-not-allowed"}
      
      />
    </div>
  );
};

export default CustomPagination;
