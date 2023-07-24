import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


const Search = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState(router.query.keyword || "");

  useEffect(() => {
    setKeyword(router.query.keyword || "");
  }, [router.query.keyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, keyword },
      });
    } else {
      const { keyword, ...restQuery } = router.query;
      router.push({
        pathname: router.pathname,
        query: restQuery,
      });
    }
  };

  return (
    <form
      className="flex flex-nowrap items-center w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mt-5 md:mt-0"
      onSubmit={handleSubmit}
    >
      <input
        className="flex-grow appearance-none border border-gray-200 bg-gray-100 rounded-md mr-2 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
        type="text"
        placeholder="Encuentra lo que buscas"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        required
      />
      <button
        type="button"
        className="px-4 py-2 inline-block text-white border border-transparent bg-blue-600 rounded-md hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Buscar
      </button>
    </form>
  );
};

export default Search;
