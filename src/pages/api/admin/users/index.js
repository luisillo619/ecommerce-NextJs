import nc from "next-connect";
import { dbConnect } from "../../../../../backend/config/dbConect";
import onError from "../../../../../backend/middlewares/errors";

import {
  autorizeRoles,
  isAuthenticatedUser,
} from "../../../../../backend/middlewares/auth";
import { getUsers } from "../../../../../backend/controllers/authControllers";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser, autorizeRoles("admin")).get(getUsers);

export default handler;
