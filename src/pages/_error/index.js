import Link from "next/link";

export default function Error() {
  return (
    <section className=" h-40 mt-60">
      <div className="flex justify-center items-center flex-col ">
        <span>Estas perdido?</span>
        <Link href="/" className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
          Regresa a casa
        </Link>
      </div>
    </section>
  );
}
