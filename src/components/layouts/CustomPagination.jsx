import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";

const CustomPagination = ({ resPerPage, productsCount }) => {
  const router = useRouter();
  const { page: pageParam, ...restSearchParams } = router.query;

  const page = Number(pageParam) || 1;

  const handlePageChange = (event, currentPage) => {
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
      handlePageChange(null, page > totalPages ? totalPages : 1);
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
    <div className="flex mt-20 justify-center">
      <Pagination
        count={Math.ceil(productsCount / resPerPage)}
        page={page}
        onChange={handlePageChange}
        siblingCount={1}
        boundaryCount={1}
        color="primary"
      />
    </div>
  );
};

export default CustomPagination;
