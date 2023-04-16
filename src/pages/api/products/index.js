import nc from "next-connect";
import { getProducts, newProduct } from "../../../../backend/controllers/productControllers";
import { dbConnect } from "../../../../backend/config/dbConect";
import onError from "../../../../backend/middlewares/errors"


// connect sirve como middleware y simplifica el codigo del backend en next. En next puro endria que tener el Switch para manejar cada metodo HTTP que acepte la funcion y mandar a llamar a la funcion correspondiente, pero con nc unicamente pongo .post, .get, .put, .delete y listo, ademas el codigo queda más modularizado porque mandas a llamar al archivo que tenga la funcion en especifico del metodo que necesites y no pones todas las funciones en un mismo archivo

const handler = nc({onError});

dbConnect();

handler.get(getProducts)
handler.post(newProduct);


export default handler