import User from "../models/user";
import Joi from "joi";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const schema = Joi.object({
    name: Joi.string().required().max(50),
    email: Joi.string().email().required().messages({
      "string.email": "Por ingresa un correo valido",
    }),
    password: Joi.string().required().min(6),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(", ");
    return res.status(400).send({ error: message });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json(user);
};
