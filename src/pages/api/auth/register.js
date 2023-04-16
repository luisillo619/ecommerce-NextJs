import nc from "next-connect";
import { registerUser } from "../../../../backend/controllers/authControllers";
import { dbConnect } from "../../../../backend/config/dbConect";
import onError from "../../../../backend/middlewares/errors"

const handler = nc({onError});
dbConnect();

handler.post(registerUser);

export default handler
