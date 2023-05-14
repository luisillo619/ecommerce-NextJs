import "@/styles/globals.css";
import { Provider } from "react-redux";
import LayoutIndex from "@/components/layouts/layoutIndex";
import store from "@/redux/store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <Provider store={store}>
        <SessionProvider>
          <LayoutIndex>
            <Component {...pageProps} />
          </LayoutIndex>
        </SessionProvider>
      </Provider>
    </>
  );
}
