import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por favor, ingresa el nombre del producto"],
  },
  description: {
    type: String,
    required: [true, "Por favor, ingresa la descripcion del producto"],
  },
  price: {
    type: Number,
    required: [true, "Por favor, ingresa el precio del producto"],
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {},
    },
  ],

  category: {
    type: String,
    required: [true, "Por favor, ingresa la categoria del producto"],
    enum: {
      values: [
        "Electronicos",
        "Laptops",
        "Juguetes",
        "Oficina",
        "Belleza",
        "Deportivos",
      ],
      message: "Por favor, selecciona una categoria valida",
    },
  },
  seller: {
    type: String,
    required: [true, "Por favor, ingresa al vendedor del producto"],
  },
  stock: {
    type: Number,
    required: [true, "Por favor ingresa el stock del producto"],
  },

  ratings: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      rating: {
        type: Number,
        require: true,
      },
      comment: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models?.Product ||
  mongoose.model("Product", productSchema);
