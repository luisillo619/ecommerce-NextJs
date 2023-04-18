import User from "../models/user";
import { uploads } from "../utils/cloudinary";
import fs from "fs";
import Joi from "joi";
import ErrorHandler from "../utils/errorHandler";

const userSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "El nombre es requerido",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "El correo es requerido",
    "string.email": "Es requerido un correo valido",
  }),
});

// validaciones desde la coleccion
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json(user);
};

export const updateProfile = async (req, res) => {
  // req.files viene del middleware multer
  // multer carga la imagen en la carpeta uploads y valida la imagen y se gurada en req.files y en la pc localmente

  // si req.files entonces se guarda en cloudinary en buyitnow/avatars
  // fs elimina la imagen de la carpeta uploads

  const existEmail = await User.findOne({ email: req.body.email });
  if (existEmail) throw new ErrorHandler("El correo ya está en uso", 400);

  const { error } = userSchema.validate({
    email: req.body.email,
    name: req.body.name,
  });

  if (error) {
    throw new ErrorHandler(
      error.details.map((detail) => detail.message).join(", "),
      400
    );
  }

  let newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.files.length > 0) {
    const uploader = async (path) => await uploads(path, "buyitnow/avatars");
    const file = req.files[0];
    const { path } = file;
    // path === 'public\uploads\promociones-empresas-espai-dental-1024x626.jpg'
    const avatarResponse = await uploader(path);
    fs.unlinkSync(path);
    newUserData.avatar = avatarResponse;
  }

  const user = await User.findByIdAndUpdate(req.user._id, newUserData);

  res.status(201).json(user);
};
