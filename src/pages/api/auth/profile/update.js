import nc from "next-connect";
import { dbConnect } from "../../../../../backend/config/dbConect";
import onError from "../../../../../backend/middlewares/errors";
import { isAuthenticatedUser } from "../../../../../backend/middlewares/auth";
import upload from "../../../../../backend/utils/multer";
import { updateProfile } from "../../../../../backend/controllers/authControllers";

const handler = nc({ onError });
dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.array("image");
handler.use(isAuthenticatedUser, uploadMiddleware).put(updateProfile);

export default handler;
