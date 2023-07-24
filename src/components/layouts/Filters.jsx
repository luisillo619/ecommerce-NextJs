import React, { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Modal from "react-modal";
Modal.setAppElement("#__next");

const categories = [
  "Electronicos",
  "Laptops",
  "Juguetes",
  "Oficina",
  "Belleza",
  "Deportivos",
];
const ratings = [5, 4, 3, 2, 1];

const Filters = () => {
  const router = useRouter();
  const [min, setMin] = useState(router.query.min || "");
  const [max, setMax] = useState(router.query.max || "");
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const CustomRating = ({ rating }) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= rating ? (
          <StarIcon key={star} className="w-4 h-4 text-[#FAAF00]" />
        ) : (
          <StarIconOutline key={star} className="w-4 h-4 text-[#FAAF00]" />
        )
      )}
    </div>
  );

  const CategoryFilter = () => (
    <>
      <h3 className="font-semibold mb-2">Categoria</h3>
      <ul className="space-y-1">
        {categories.map((category) => (
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
    </>
  );

  const RatingFilter = () => (
    <>
      <h3 className="font-semibold mb-2">Calificaciones</h3>
      <ul className="space-y-1">
        {ratings.map((rating) => (
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
    </>
  );

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <button
        className="block md:hidden mb-5 w-full text-center px-4 py-2 text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
        onClick={() => setModalIsOpen(true)}
      >
        Filtrar por:
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white rounded-lg shadow-xl p-6 lg:w-1/3 mx-auto flex justify-center flex-col mt-10 gap-1"
      >
        <>
          <h3 className="font-semibold mb-2">Precio:</h3>
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
          <button
            className="px-1 py-2 text-center w-full text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            onClick={handleButtonClick}
          >
            Ir
          </button>
        </>
        <hr className="my-4" />
        <CategoryFilter />
        <hr className="my-4" />
        <RatingFilter />
      </Modal>
      <div className="hidden md:block border border-gray-200 bg-white rounded shadow-sm p-6">
        <>
          <h3 className="font-semibold mb-2">Precio:</h3>
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
          <button
            className="px-1 py-2 text-center w-full text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            onClick={handleButtonClick}
          >
            Ir
          </button>
        </>
        <hr className="my-4" />
        <CategoryFilter />
        <hr className="my-4" />
        <RatingFilter />
      </div>
    </aside>
  );
};

export default Filters;
