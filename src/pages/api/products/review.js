import nc from "next-connect";
import { createProductReview } from "../../../../backend/controllers/productControllers";
import { dbConnect } from "../../../../backend/config/dbConect";
import onError from "../../../../backend/middlewares/errors"
import { isAuthenticatedUser } from "../../../../backend/middlewares/auth";

const handler = nc({onError});

dbConnect();

handler.use(isAuthenticatedUser).put(createProductReview)


export default handler