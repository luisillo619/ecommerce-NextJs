import mongoose from "mongoose";

export function isMongoId(id, res) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "El id es invalido",
    });
  }
}
