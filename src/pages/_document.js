import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link
        rel="stylesheet"
        href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        precedence="default"
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
