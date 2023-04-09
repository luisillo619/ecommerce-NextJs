import "@/styles/globals.css";
import { Provider } from "react-redux";
import LayoutIndex from "@/components/layouts/layoutIndex";
import store from "@/redux/store/store";

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <LayoutIndex>
        <Component {...pageProps} />
      </LayoutIndex>
    </Provider>
  );
}
