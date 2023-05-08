import React from "react";
import axios from "axios";
import queryString from "query-string";
import Products from "@/components/admin/Products";
import UserProfileLayout from "@/components/layouts/UserProfileLayout";

export const getServerSideProps = async ({ query }) => {
  const urlParams = {
    page: query.page,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/products?${searchQuery}`
  );

  return {
    props: {
      data,
    },
  };
};

const HomePagee = ({ data }) => {
  return (
    <UserProfileLayout>
      <Products data={data} />;
    </UserProfileLayout>
  );
};

export default HomePagee;
