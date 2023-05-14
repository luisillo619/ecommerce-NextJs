import Error404 from "@/components/errors/404";

function Error({ statusCode }) {

  if (statusCode === 404) return <Error404 />;

  return <p>Error desconocido</p>;
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
