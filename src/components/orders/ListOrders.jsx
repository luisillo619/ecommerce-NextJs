import React, { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import CustomPagination from "../layouts/CustomPagination";
import { clearCart } from "@/redux/reducer/cartSlice";
import { useDispatch } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";

const ListOrders = ({ orders }) => {
  const dispatch = useDispatch();
  const params = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState();
  const orderSuccess = params.get("order_success");

  useEffect(() => {
    if (orderSuccess === "true") {
      dispatch(clearCart());
      router.replace("/profile/orders");
    }
  }, []);
  

  return (
    <>
      <h3 className="text-xl font-semibold mb-5">Tus ordenes</h3>
      {orders?.orders?.map((order) => (
        <OrderItem key={order._id} order={order} />
      ))}
      <div className="w-full flex justify-center">
        <CustomPagination
          resPerPage={orders?.resPerPage}
          productsCount={orders?.ordersCount}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </>
  );
};

export default ListOrders;
