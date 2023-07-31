import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";

const useHandlePageChange = (
  page,
  productsCount,
  resPerPage,
  setLoading,
  router
) => {
  const handlePageChange = (selectedItem) => {
    const currentPage = selectedItem.selected + 1;

    router.replace({
      pathname: router.pathname,
      query: { ...router.query, page: currentPage },
    });
  };

  useEffect(() => {
    if (productsCount === 0) return;

    const totalPages = Math.ceil(productsCount / resPerPage);

    if (page > totalPages || page < 1) {
      setLoading(true);
      handlePageChange({ selected: page > totalPages ? totalPages - 1 : 0 });
    } else {
      setLoading(false);
    }
  }, [router.query]);

  return handlePageChange;
};

const CustomPagination = ({
  resPerPage,
  productsCount,
  loading,
  setLoading,
}) => {
  const router = useRouter();
  const page = Number(router.query.page) || 1;

  const handlePageChange = useHandlePageChange(
    page,
    productsCount,
    resPerPage,
    setLoading,
    router
  );

  const totalPages = Math.ceil(productsCount / resPerPage);

  if (productsCount === 0) {
    return <div style={{ textAlign: "center" }}>No hay disponibles.</div>;
  }

  return (
    <div className="w-full flex flex-wrap justify-center items-center">
      {!loading && (
        <ReactPaginate
          pageCount={totalPages}
          onPageChange={handlePageChange}
          forcePage={page - 1}
          previousLabel="Anterior"
          nextLabel="Siguiente"
          breakLabel="..."
          containerClassName="flex flex-col md:flex-row items-center md:space-y-0 space-y-4 md:space-x-4"
          pageClassName="order-2 border rounded mx-1"
          pageLinkClassName="px-2 md:px-4 py-1 md:py-2 w-full md:w-auto h-full flex items-center justify-center"
          activeClassName="bg-blue-600 border text-white"
          breakClassName="order-2 px-2 md:px-4 py-1 md:py-2 mx-1 border border-red-500"
          previousClassName="order-1 border rounded mx-1"
          nextClassName="order-3 border rounded mx-1"
          previousLinkClassName="px-2 md:px-4 py-1 md:py-2 w-full md:w-auto h-full flex items-center justify-center"
          nextLinkClassName="px-2 md:px-4 py-1 md:py-2 w-full md:w-auto h-full flex items-center justify-center"
          disabledClassName="opacity-50 cursor-not-allowed"
          disabledLinkClassName="opacity-50 cursor-not-allowed"
        />
      )}
    </div>
  );
};

export default CustomPagination;
