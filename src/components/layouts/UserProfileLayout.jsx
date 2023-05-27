import Sidebar from "./Sidebar";

export default function UserProfileLayout({ children }) {
  return (
    <>
      <section className="py-2 bg-blue-100 ">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h1 className="font-bold text-2xl ml-7">Panel de Usuario</h1>
        </div>
      </section>

      <section className="py-10 ">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
            <div className="col-span-3 md:col-span-1 ">
              <Sidebar />
            </div>
            <div className="col-span-3">
              <main className="w-full">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  {children}
                </article>
              </main>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
