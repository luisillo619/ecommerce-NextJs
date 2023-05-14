import React, { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const Filters = () => {
  const router = useRouter();
  const [min, setMin] = useState(router.query.min || "");
  const [max, setMax] = useState(router.query.max || "");

  useEffect(() => {
    setMin(router.query.min || "");
    setMax(router.query.max || "");
  }, [router.query.min, router.query.max]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (!checked) {
      const { [name]: _, ...restQuery } = router.query;
      router.push({ query: restQuery });
    } else {
      router.push({ query: { ...router.query, [name]: event.target.value } });
    }
  };

  const handleButtonClick = () => {
    router.push({ query: { ...router.query, min, max } });
  };
  
  const CustomRating = ({ rating }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          return star <= rating ? (
            <StarIcon key={star} className="w-4 h-4 text-[#FAAF00]" />
          ) : (
            <StarIconOutline key={star} className="w-4 h-4 text-[#FAAF00]" />
          );
        })}
      </div>
    );
  };

return (
  <aside className="md:w-1/3 lg:w-1/4 px-4">
    <a
      className="block md:hidden mb-5 w-full text-center px-4 py-2 text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
      href="#"
    >
      Filtrar por:
    </a>
    <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
      <h3 className="font-semibold mb-2">Precio:</h3>
      <div className="grid md:grid-cols-3 gap-x-2">
        <div className="mb-4">
          <input
            name="min"
            className="border border-gray-200 bg-gray-100 rounded-md py-2 px-3 w-full hover:border-gray-400 focus:outline-none focus:border-gray-400"
            type="text"
            min="0"
            placeholder="Min"
            value={min}
            onChange={(e) => {
              if (e.target.value >= 0) setMin(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <input
            name="max"
            className="border border-gray-200 bg-gray-100 rounded-md py-2 px-3 w-full hover:border-gray-400 focus:outline-none focus:border-gray-400"
            type="text"
            min="0"
            placeholder="Max"
            value={max}
            onChange={(e) => {
              if (e.target.value >= 0) setMax(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <button
            className="px-1 py-2 text-center w-full text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            onClick={handleButtonClick}
          >
            Ir
          </button>
        </div>
      </div>
    </div>

    <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
      <h3 className="font-semibold mb-2">Categoria</h3>
      <ul className="space-y-1">
        {[
          "Electrónicos",
          "Laptops",
          "Juguetes",
          "Oficina",
          "Belleza",
          "Deportivos",
        ].map((category) => (
          <li key={category}>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value={category}
                className="h-4 w-4"
                checked={router.query.category === category}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2 text-gray-500">{category}</span>
            </label>
          </li>
        ))}
      </ul>

      <hr className="my-4" />

      <h3 className="font-semibold mb-2">Calificaciones</h3>
      <ul className="space-y-1">
        {[5, 4, 3, 2, 1].map((rating) => (
          <li key={rating}>
            <label className="flex items-center">
              <input
                name="ratings"
                type="checkbox"
                value={rating}
                className="h-4 w-4"
                checked={router.query.ratings === `${rating}`}
                onChange={handleCheckboxChange}
                />
                <span className="ml-2 text-gray-500">
                  <CustomRating rating={rating} />
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default (Filters);
