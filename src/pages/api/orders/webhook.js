import nc from "next-connect";
import { webhook } from "../../../../backend/controllers/orderControllers";
import { dbConnect } from "../../../../backend/config/dbConect";
import onError from "../../../../backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(webhook);

export default handler;
