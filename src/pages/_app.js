import "@/styles/globals.css";
import { Provider } from "react-redux";
import LayoutIndex from "@/components/layouts/layoutIndex";
import store from "@/redux/store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";


export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <>
      <ToastContainer position="bottom-right" />
      <Provider store={store}>
        <SessionProvider>
          {/*acceso a la sesion del usuario*/}
          <LayoutIndex>
            <Component {...pageProps} />
          </LayoutIndex>
        </SessionProvider>
      </Provider>
    </>
  );
}

