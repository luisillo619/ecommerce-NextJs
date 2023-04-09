import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Porfavor ingresa el nombre del producto"],
  },
  description: {
    type: String,
    required: [true, "Porfavor ingresa la descripcion del producto"],
  },
  price: {
    type: Number,
    required: [true, "Porfavor ingresa el precio del producto"],
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
    required: [true, "Porfavor ingresa la categoria del producto"],
    enum: {
      values: [
        "Electronicos",
        "Laptops",
        "Juguetes",
        "Oficina",
        "Belleza",
        "Deportivos",
      ],
      message: "Porfavor seleccione una categoria valida",
    },
  },
  seller: {
    type: String,
    required: [true, "Porfavor ingresa al vendedor del producto"],
  },
  stock: {
    type: Number,
    required: [true, "Porfavor ingresa el stock del producto"],
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
