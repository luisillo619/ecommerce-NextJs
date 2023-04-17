import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  cartItems: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Por favor, ingresa el usuario"],
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Por favor, ingresa el producto"],
      },
      quantity: {
        type: Number,
        required: [
          true,
          "Por favor, ingresa la cantidad de unidades del producto",
        ],
      },
    },
  ],
});

export default mongoose.models?.Cart || mongoose.model("Cart", cartSchema);
