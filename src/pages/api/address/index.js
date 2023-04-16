import nc from "next-connect";
import {
  getAddresses,
  newAddress,
} from "../../../../backend/controllers/addressControllers";
import { dbConnect } from "../../../../backend/config/dbConect";
import onError from "../../../../backend/middlewares/errors"
import { isAuthenticatedUser } from "../../../../backend/middlewares/auth";


const handler = nc({onError});
dbConnect();

handler.use(isAuthenticatedUser).get(getAddresses);
handler.use(isAuthenticatedUser).post(newAddress);

export default handler;
