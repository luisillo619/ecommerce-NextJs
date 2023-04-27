import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  // En el front necesito un array de productos y posible mente en el front lo tenga que modificar para que sea asi {[{products},{products}],{user}}
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export default mongoose.models?.Cart || mongoose.model("Cart", cartSchema);
