import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { StarBorder } from "@mui/icons-material";
import { useRouter } from "next/router";
import { getPriceQueryParams } from "../../helpers/helpers";
const Filters = () => {
  const router = useRouter();
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  let queryParams;

  // verifica si min o max existe en query y si existe settea el estado
  useEffect(() => {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
    }

    if (typeof window !== "undefined") {
      const minValue = queryParams.get("min");
      const maxValue = queryParams.get("max");
      if (minValue) setMin(minValue);
      else setMin;
      if (maxValue) setMax(maxValue);
    }
  }, []);

  // Verifica si algun check existe en query y de ser asi se selecciona por defualt
  function checkHandler(checkBoxType, checkBoxValue) {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
    }

    if (typeof window !== "undefined") {
      const value = queryParams.get(checkBoxType);
      if (checkBoxValue === value) return true;
      return false;
    }
  }

  function handlerClick(checkbox) {
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
  }

  function handleButtonClick() {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
      queryParams = getPriceQueryParams(queryParams, "min", min);
      queryParams = getPriceQueryParams(queryParams, "max", max);
      const path = window.location.pathname + "?" + queryParams.toString();
      router.push(path);
    }
  }

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <a
        className="md:hidden mb-5 w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
        href="#"
      >
        Filtrar por:
      </a>
      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">Precio ($)</h3>
        <div className="grid md:grid-cols-3 gap-x-2">
          <div className="mb-4">
            <input
              name="min"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="Min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <input
              name="max"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="Max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <button
              className="px-1 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              onClick={handleButtonClick}
            >
              Ir
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm ">
        <h3 className="font-semibold mb-2">Categoria</h3>

        <ul className="space-y-1">
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Electronicos"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Electronicos")}
                onClick={(e) => handlerClick(e.target)}
              />
              <span className="ml-2 text-gray-500"> Electronicos </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Laptops"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Laptops")}
                onClick={(e) => handlerClick(e.target)}
              />
              <span className="ml-2 text-gray-500"> Laptops </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Juguetes"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Juguetes")}
                onClick={(e) => handlerClick(e.target)}
              />
              <span className="ml-2 text-gray-500"> Juguetes </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Oficina"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Oficina")}
                onClick={(e) => handlerClick(e.target)}
              />
              <span className="ml-2 text-gray-500"> Oficina </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Belleza"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Belleza")}
                onClick={(e) => handlerClick(e.target)}
              />
              <span className="ml-2 text-gray-500"> Belleza </span>
            </label>
          </li>
        </ul>

        <hr className="my-4" />

        <h3 className="font-semibold mb-2">Calificaciones</h3>
        <ul className="space-y-1">
          <li>
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  name="ratings"
                  type="checkbox"
                  value={rating}
                  className="h-4 w-4"
                  defaultChecked={checkHandler("ratings", `${rating}`)}
                  onClick={(e) => handlerClick(e.target)}
                />
                <span className="ml-2 text-gray-500">
                  <Rating
                    value={rating}
                    readOnly
                    precision={1}
                    icon={<StarBorder fontSize="inherit" />}
                  />
                </span>
              </label>
            ))}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Filters;
