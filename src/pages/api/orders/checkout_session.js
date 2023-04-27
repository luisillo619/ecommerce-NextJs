import nc from "next-connect";
import { checkoutSession } from "../../../../backend/controllers/orderControllers";
import { dbConnect } from "../../../../backend/config/dbConect";
import onError from "../../../../backend/middlewares/errors";
import { isAuthenticatedUser } from "../../../../backend/middlewares/auth";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).post(checkoutSession);

export default handler;
