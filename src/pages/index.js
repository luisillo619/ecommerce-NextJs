import axios from "axios";
import queryString from "query-string";
import ListProducts from "../components/products/ListProducts";

export const getServerSideProps = async ({ query }) => {
  const { keyword, page, category, ratings, min, max } = query;

  const cleanUrlParams = (params) =>
    Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== "")
    );

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
  return <ListProducts data={products} />;
};

export default HomePage;