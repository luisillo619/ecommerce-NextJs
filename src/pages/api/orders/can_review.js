import nc from "next-connect";
import { canReview } from "../../../../backend/controllers/orderControllers";
import { dbConnect } from "../../../../backend/config/dbConect";
import onError from "../../../../backend/middlewares/errors";
import { isAuthenticatedUser } from "../../../../backend/middlewares/auth";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).get(canReview);

export default handler;
