import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";

const useHandlePageChange = (page, productsCount, resPerPage, setLoading) => {
  const router = useRouter();
  const { ...restSearchParams } = router.query;

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

const CustomPagination = ({ resPerPage, productsCount }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const page = Number(router.query.page) || 1;

  const handlePageChange = useHandlePageChange(
    page,
    productsCount,
    resPerPage,
    setLoading
  );

  const totalPages = useMemo(
    () => Math.ceil(productsCount / resPerPage),
    [productsCount, resPerPage]
  );

  if (productsCount === 0) {
    return <div>No hay productos disponibles.</div>;
  }

  return (
    <div className="flex mt-10 justify-center">
      {!loading && (
        <ReactPaginate
          pageCount={totalPages}
          onPageChange={handlePageChange}
          forcePage={page - 1}
          previousLabel="Anterior"
          nextLabel="Siguiente"
          breakLabel="..."
          containerClassName="flex items-center justify-center space-x-1 sm:space-x-2"
          pageClassName="bg-white text-gray-800 border border-gray-300 hover:border-gray-500 hover:bg-gray-200 rounded"
          pageLinkClassName="px-2 sm:px-3 py-1 sm:py-2 inline-block"
          activeClassName="border border-blue-500 bg-blue-500 text-white"
          breakClassName="hidden sm:block bg-white text-gray-800 border border-gray-300 hover:border-gray-500 hover:bg-gray-200 rounded"
          breakLinkClassName="px-2 sm:px-3 py-1 sm:py-2 inline-block"
          previousClassName="bg-white text-gray-800 border border-gray-300 hover:border-gray-500 hover:bg-gray-200 rounded"
          nextClassName="bg-white text-gray-800 border border-gray-300 hover:border-gray-500 hover:bg-gray-200 rounded"
          previousLinkClassName="px-2 sm:px-3 py-1 sm:py-2 inline-block"
          nextLinkClassName="px-2 sm:px-3 py-1 sm:py-2 inline-block"
          disabledClassName="opacity-50 cursor-not-allowed"
          disabledLinkClassName="opacity-50 cursor-not-allowed"
        />
      )}
    </div>
  );
};

export default CustomPagination;
