import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  shippingInfo: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Address",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Product",
      },
      name: {
        type: String,
        require: true,
      },
      quantity: {
        type: String,
        require: true,
      },

      image: {
        type: String,
        require: true,
      },

      price: {
        type: String,
        require: true,
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    taxPaid: {
      type: Number,
      require: true,
    },
    amountPaid: {
      type: Number,
      require: true,
    },
  },
  orderStatus: {
    type: String,
    default: "Processing",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models?.Order || mongoose.model("Order", orderSchema);
