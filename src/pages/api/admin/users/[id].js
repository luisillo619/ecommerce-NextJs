import nc from "next-connect";
import { dbConnect } from "../../../../../backend/config/dbConect";
import onError from "../../../../../backend/middlewares/errors";

import {
  autorizeRoles,
  isAuthenticatedUser,
} from "../../../../../backend/middlewares/auth";
import { deleteUser, getUser, updateUser } from "../../../../../backend/controllers/authControllers";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser, autorizeRoles("admin")).get(getUser);
handler.use(isAuthenticatedUser, autorizeRoles("admin")).put(updateUser);
handler.use(isAuthenticatedUser, autorizeRoles("admin")).delete(deleteUser);




export default handler;
