import React, { useEffect, useState, useCallback, memo } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { getPriceQueryParams } from "../../helpers/helpers";
import { useRouter } from "next/router";

const Filters = () => {
  const router = useRouter();
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  let queryParams;

  // verifica si min o max existe en query y si existe settea el estado
  useEffect(() => {
    if (Object.keys(router.query).length === 0) {
      const minInput = document.querySelector('input[name="min"]');
      const maxInput = document.querySelector('input[name="max"]');
      if (minInput) minInput.value = "";
      if (maxInput) maxInput.value = "";
      setMin("");
      setMax("");
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => (checkbox.checked = false));
    }

    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
    }

    if (typeof window !== "undefined") {
      const minValue = queryParams.get("min");
      const maxValue = queryParams.get("max");
      if (minValue) setMin(minValue);
      else setMin("");
      if (maxValue) setMax(maxValue);
    }
  }, [router]);

  // Verifica si algun check existe en query y de ser asi se selecciona por defualt
  const checkHandler = useCallback((checkBoxType, checkBoxValue) => {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
    }

    if (typeof window !== "undefined") {
      const value = queryParams.get(checkBoxType);
      if (checkBoxValue === value) return true;
      return false;
    }
  }, []);

  const handlerClick = useCallback((checkbox) => {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);

      const checkboxes = document.getElementsByName(checkbox.name);
      checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
      });
      if (checkbox.checked === false) {
        // eliminar la query de la seleccion
        queryParams.delete(checkbox.name);
      } else {
        // agregar el filtro a la query
        if (queryParams.has(checkbox.name)) {
          queryParams.set(checkbox.name, checkbox.value);
        } else {
          queryParams.append(checkbox.name, checkbox.value);
        }
      }
      const path = window.location.pathname + "?" + queryParams.toString();
      router.push(path);
    }
  }, []);

  const handleButtonClick = useCallback(() => {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
      queryParams = getPriceQueryParams(queryParams, "min", min);
      queryParams = getPriceQueryParams(queryParams, "max", max);
      const path = window.location.pathname + "?" + queryParams.toString();
      router.push(path);
    }
  }, [min, max]);

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
                  defaultChecked={checkHandler("category", category)}
                  onClick={(e) => handlerClick(e.target)}
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
                  defaultChecked={checkHandler("ratings", `${rating}`)}
                  onClick={(e) => handlerClick(e.target)}
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

export default memo(Filters);
