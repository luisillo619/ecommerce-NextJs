import User from "../models/user";
import { uploads } from "../utils/cloudinary";
import fs from "fs";
import Joi from "joi";
import ErrorHandler from "../utils/errorHandler";
import bcrypt from "bcryptjs";
import { sendWelcomeMail } from "../utils/nodemailer";
import APIFilters from "../utils/APIFilters";

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
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+password"
  );

  if (user && user.isOAuthUser && !user.password) {
    user.password = password;
    await user.save();
    user.password = null;
    return res.status(200).json(user);
  }

  const newUser = await User.create({
    name,
    email: email.toLowerCase(),
    password,
  });

  await sendWelcomeMail(req.body);
  res.status(201).json(newUser);
};

export const updateProfile = async (req, res, next) => {
  // req.files viene del middleware multer
  // multer carga la imagen en la carpeta uploads y valida la imagen y se gurada  en req.files y en la pc localmente

  // si req.files entonces se guarda en cloudinary en buyitnow/avatars
  // fs elimina la imagen de la carpeta uploads

  const existEmail = await User.findOne({ email: req.body.email });
  if (existEmail && existEmail.email !== req.user.email.toLowerCase()) {
    return next(new ErrorHandler("El correo ya está en uso", 400));
  }

  const { error } = userSchema.validate({
    email: req.body.email,
    name: req.body.name,
  });

  if (error) {
    return next(
      new ErrorHandler(
        error.details.map((detail) => detail.message).join(", "),
        400
      )
    );
  }

  let newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  // LOCAL:
  // if (req.files.length > 0) {
  //   const uploader = async (path) => await uploads(path, "buyitnow/avatars");
  //   const file = req.files[0];
  //   const { path } = file;
  //   // path === 'public\uploads\promociones-empresas-espai-dental-1024x626.jpg'
  //   const avatarResponse = await uploader(path);
  //   // Elimina el archivo temporal de la pc
  //   fs.unlinkSync(path);
  //   newUserData.avatar = avatarResponse;
  // }

  // DEPLOYADO:
  if (req.files.length > 0) {
    const uploader = async (buffer) =>
      await uploads(buffer, "buyitnow/avatars");
    const file = req.files[0];
    const buffer = file.buffer;
    const avatarResponse = await uploader(buffer);

    // No es necesario eliminar el archivo del servidor, ya que se almacenó en memoria
    newUserData.avatar = avatarResponse;
  }

  const user = await User.findByIdAndUpdate(req.user._id, newUserData);

  res.status(201).json(user);
};

export const updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  const isPasswordMatched = await bcrypt.compare(
    req.body.currentPassword,
    user.password
  );

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Tu contraseña actual es incorrecta", 400));
  }

  user.password = req.body.newPassword;
  await user.save();
  res.status(201).json({
    success: true,
  });
};

export const getUsers = async (req, res) => {
  const resPerPage = 2;
  const usersCount = await User.find().countDocuments();

  const apiFilters = new APIFilters(User.find(), req.query).pagination(
    resPerPage
  );

  const users = await apiFilters.query;

  res.status(200).json({
    usersCount,
    resPerPage,
    users,
  });
};

export const getUser = async (req, res) => {
  let user = await User.findById(req.query.id);

  if (!user) {
    return next(new ErrorHandler("No user found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
};

export const updateUser = async (req, res) => {
  let user = await User.findById(req.query.id);

  if (!user) {
    return next(new ErrorHandler("No user found with this ID", 404));
  }

  user = await User.findByIdAndUpdate(req.query.id, req.body.userData);

  res.status(200).json({
    success: true,
    user,
  });
};

export const deleteUser = async (req, res) => {
  let user = await User.findById(req.query.id);

  if (!user) {
    return next(new ErrorHandler("No User found with this ID", 404));
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
  });
};