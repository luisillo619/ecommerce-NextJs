import nc from "next-connect";
import { dbConnect } from "../../../../../backend/config/dbConect";
import onError from "../../../../../backend/middlewares/errors";
import { isAuthenticatedUser } from "../../../../../backend/middlewares/auth";
import { updatePassword } from "../../../../../backend/controllers/authControllers";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).put(updatePassword);

export default handler;
