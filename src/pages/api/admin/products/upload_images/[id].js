import nc from "next-connect";
import { dbConnect } from "../../../../../../backend/config/dbConect";
import onError from "../../../../../../backend/middlewares/errors";
import {
  autorizeRoles,
  isAuthenticatedUser,
} from "../../../../../../backend/middlewares/auth";
import upload from "../../../../../../backend/utils/multer";
import { uploadProductImages } from "../../../../../../backend/controllers/productControllers";

const handler = nc({ onError });
dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.array("image");
handler
  .use(isAuthenticatedUser, autorizeRoles("admin"), uploadMiddleware)
  .post(uploadProductImages);

export default handler;
