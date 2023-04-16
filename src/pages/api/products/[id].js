import nc from "next-connect";
import { getProduct } from "../../../../backend/controllers/productControllers";
import { dbConnect } from "../../../../backend/config/dbConect";
import onError from "../../../../backend/middlewares/errors"

const handler = nc({onError});
dbConnect();

handler.get(getProduct);

export default handler;
