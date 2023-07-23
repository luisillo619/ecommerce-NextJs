import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "El nombre del producto es requerido"],
  },
  description: {
    type: String,
    required: [true, "La descripcion del es requerida"],
  },
  price: {
    type: Number,
    required: [true, "El precio es requerido"],
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "La categoria es requerida"],
    enum: {
      values: [
        "Electronicos",
        "Laptops",
        "Juguetes",
        "Oficina",
        "Belleza",
        "Deportivos",
      ],
      message: "Selecciona una categoria valida",
    },
  },
  seller: {
    type: String,
    required: [true, "El vendedor es requerido"],
  },
  stock: {
    type: Number,
    required: [true, "El stock es requerido"],
  },

  ratings: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models?.Product ||
  mongoose.model("Product", productSchema);
