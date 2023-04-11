import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Porfavor ingresa tu nombre"],
  },
  email: {
    type: String,
    required: [true, "Porfavor ingresa tu email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Porfavor ingresa tu password"],
    minLength: [6, "Tu contraseña debe tener mas de 6 caracteres"],
    select: false, //  no se devolvera en la respuesta de la consulta
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
