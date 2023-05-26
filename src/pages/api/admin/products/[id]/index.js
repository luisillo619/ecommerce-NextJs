import nc from "next-connect";
import { dbConnect } from "../../../../../../backend/config/dbConect";
import onError from "../../../../../../backend/middlewares/errors";
import {
  autorizeRoles,
  isAuthenticatedUser,
} from "../../../../../../backend/middlewares/auth";
import {
  deleteProduct,
  updateProduct,
} from "../../../../../../backend/controllers/productControllers";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser, autorizeRoles("admin")).put(updateProduct);
handler.use(isAuthenticatedUser, autorizeRoles("admin")).delete(deleteProduct);

export default handler;
