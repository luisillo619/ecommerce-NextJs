import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: [true, "La calle es requerida"],
  },
  city: {
    type: String,
    required: [true, "La ciudad es requerida"],
  },
  state: {
    type: String,
    required: [true, "El estado es requerido"],
  },

  phoneNumber: {
    type: String,
    required: [true, "El número de teléfono es requerido"],
  },

  zipCode: {
    type: String,
    required: [true, "El código postal es requerido"],
  },

  country: {
    type: String,
    required: [true, "El país es requerido"],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models?.Address ||
  mongoose.model("Address", addressSchema);
