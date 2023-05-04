import { useMemo } from "react";
import axios from "axios";
import queryString from "query-string";
import ListProducts from "../components/products/ListProducts";

export const getServerSideProps = async ({ query }) => {
  const { keyword, page, category, ratings, min, max } = query;

  const cleanUrlParams = (params) => {
    const cleanedParams = {};
    for (const key in params) {
      if (
        params[key] !== undefined &&
        params[key] !== null &&
        params[key] !== ""
      ) {
        cleanedParams[key] = params[key];
      }
    }
    return cleanedParams;
  };

  const urlParams = cleanUrlParams({
    keyword,
    page,
    category,
    "ratings[gte]": ratings,
    "price[gte]": min,
    "price[lte]": max,
  });

  const searchQuery = queryString.stringify(urlParams);
  const { data: products } = await axios.get(
    `${process.env.API_URL}/api/products?${searchQuery}`
  );

  return {
    props: {
      products,
    },
  };
};

const HomePage = ({ products }) => {
  const memoizedProducts = useMemo(() => products, [products]);

  return <ListProducts data={memoizedProducts} />;
};

export default HomePage;
