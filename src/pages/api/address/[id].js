import nc from "next-connect";
import {
  deleteAddress,
  getAddress,
  updateAddress,
} from "../../../../backend/controllers/addressControllers";
import { dbConnect } from "../../../../backend/config/dbConect";
import onError from "../../../../backend/middlewares/errors";
import { isAuthenticatedUser } from "../../../../backend/middlewares/auth";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).get(getAddress);
handler.use(isAuthenticatedUser).delete(deleteAddress);
handler.use(isAuthenticatedUser).put(updateAddress);

export default handler;
