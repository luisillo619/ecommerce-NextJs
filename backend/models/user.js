import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
  email: {
    type: String,
    required: [true, "El correo es requerido"],
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return this.isNew && !this.isOAuthUser;
    },
    minLength: [6, "La contraseña debe tener más de 6 caracteres"],
    select: false, // no se devolverá en la respuesta de la consulta
  },
  isOAuthUser: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.models?.User || mongoose.model("User", userSchema);
