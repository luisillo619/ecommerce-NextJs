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
          containerClassName="flex items-center"
          pageClassName="border rounded mx-1"
          pageLinkClassName="px-4 py-2 w-full h-full flex items-center justify-center"
          activeClassName="bg-blue-600 border text-white"
          breakClassName="px-4 py-2 mx-1 border border-red-500"
          previousClassName="border rounded mx-1"
          nextClassName="border rounded mx-1"
          previousLinkClassName="px-4 py-2 w-full h-full flex items-center justify-center"
          nextLinkClassName="px-4 py-2 w-full h-full flex items-center justify-center"
          disabledClassName="opacity-50 cursor-not-allowed"
          disabledLinkClassName="opacity-50 cursor-not-allowed"
        />
      )}
    </div>
  );
};

export default CustomPagination;
