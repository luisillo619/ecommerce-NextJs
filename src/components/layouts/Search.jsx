import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Search = () => {
  const [keyword, setKeyword] = useState();
  const router = useRouter();
  let queryParams;

  const handlerSumbit = (e) => {
    e.preventDefault();
   
    if (keyword) {
      queryParams = new URLSearchParams(window.location.search);
      if (queryParams.has("keyword")) {
        queryParams.set("keyword", keyword);
      } else {
        queryParams.append("keyword", keyword);
      }
      const path = window.location.origin + "?" + queryParams.toString();
      router.push(path);
    } else router.push("/");
  };

  // verifica si la keyword existe en query y si existe settea el estado
  useEffect(() => {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
    }

    if (typeof window !== "undefined") {
      const value = queryParams.get("keyword");
      if (value) setKeyword(value);
    }
  }, []);

  return (
    <form
      className="flex flex-nowrap items-center w-full order-last md:order-none mt-5 md:mt-0 md:w-2/4 lg:w-2/4"
      onSubmit={handlerSumbit}
    >
      <input
        className="flex-grow appearance-none border border-gray-200 bg-gray-100 rounded-md mr-2 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
        type="text"
        placeholder="Enter your keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        required
      />
      <button
        type="button"
        className="px-4 py-2 inline-block text-white border border-transparent bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={handlerSumbit}
      >
        Search
      </button>
    </form>
  );
};

export default Search;
