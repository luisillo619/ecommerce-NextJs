import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AOS from 'aos';

const Error404 = () => {
  const [path, setPath] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setPath(window.location.pathname);
    AOS.init({
      duration: 1400,
    });
  }, []);

  if (path === null) return null;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-blue-800 p-4">
      <div 
        data-aos="fade-up"
        className="text-center mb-5"
      >
        <h1 className="text-5xl sm:text-8xl font-extrabold tracking-tighter mb-4">404</h1>
        <h2 className="text-xl sm:text-3xl">
          Lo sentimos, la ruta{" "}
          <span className="text-lg sm:text-2xl border-b-2 border-blue-500 inline-block break-words">({path})</span>{" "}
          no existe.
        </h2>
      </div>
      <div className="mb-5">
        <Image
          src="https://res.cloudinary.com/drkzjxpza/image/upload/v1684049700/buyitnow/errors/Error404_xncugl.png"
          objectFit="contain"
          alt="404"
          width="200"
          height="200"
        />
      </div>
      <button
        onClick={() => router.replace("/")}
        className="text-lg font-medium bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Regresar al inicio
      </button>
    </div>
  );
};

export default Error404;