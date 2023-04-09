import axios from "axios";
import React from "react";
import queryString from "query-string";
import ListProducts from "../components/products/ListProducts";

export const getServerSideProps = async (context) => {
  const { keyword, page, category, ratings, min, max } = context.query;

  const urlParams = {
    keyword,
    page,
    category,
    "ratings[gte]": ratings,
    "price[gte]": min,
    "price[lte]": max,
  };

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
  return <ListProducts data={products} />;
};

export default HomePage;
