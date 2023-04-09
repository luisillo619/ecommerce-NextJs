import nc from "next-connect";
import { getProduct } from "../../../../backend/controllers/productControllers";
import { dbConnect } from "../../../../backend/config/dbConect";
const handler = nc();
dbConnect();

handler.get(getProduct);

export default handler;
