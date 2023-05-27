import nc from "next-connect";
import { dbConnect } from "../../../../../backend/config/dbConect";
import onError from "../../../../../backend/middlewares/errors";

import {
  autorizeRoles,
  isAuthenticatedUser,
} from "../../../../../backend/middlewares/auth";
import { deleteOrder, getOrder, updateOrder } from "../../../../../backend/controllers/orderControllers";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser, autorizeRoles("admin")).get(getOrder);
handler.use(isAuthenticatedUser, autorizeRoles("admin")).put(updateOrder);
handler.use(isAuthenticatedUser, autorizeRoles("admin")).delete(deleteOrder);




export default handler;
