import nc from "next-connect";
import { registerUser } from "../../../../backend/controllers/authControllers";
import { dbConnect } from "../../../../backend/config/dbConect";

const handler = nc();
dbConnect();

handler.post(registerUser);

export default handler
