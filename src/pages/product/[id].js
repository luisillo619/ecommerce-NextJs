import ProductDetails from "@/components/products/ProductDetails";
import axios from "axios";

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  const { data } = await axios.get(`${process.env.API_URL}/api/products/${id}`);
  return {
    props: {
      product: data.product,
    },
  };
};

export default function ProductDetailsPage({ product }) {
  return <ProductDetails product={product} />;
}
