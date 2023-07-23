import ProductDetails from "@/components/products/ProductDetails";
import axios from "axios";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  const { id } = context.params;
  const { data } = await axios.get(`${process.env.API_URL}/api/products/${id}`);
  return {
    props: {
      product: data.product,
      session
    },
  };
};

export default function ProductDetailsPage({ product,session }) {
  return <ProductDetails product={product} session={session} />;
}
