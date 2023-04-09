import "@/styles/globals.css";
import LayoutIndex from "@/components/layouts/layoutIndex";

export default function MyApp({ Component, pageProps }) {
  return (
    <LayoutIndex>
      <Component {...pageProps} />
    </LayoutIndex>
  );
}
