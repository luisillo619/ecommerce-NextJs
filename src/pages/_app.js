import "@/styles/globals.css";
import { Provider } from "react-redux";
import LayoutIndex from "@/components/layouts/layoutIndex";
import store from "@/redux/store/store";
import { ToastContainer } from "react-toastify";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <Provider store={store}>
        <LayoutIndex>
          <Component {...pageProps} />
        </LayoutIndex>
      </Provider>
    </>
  );
}
