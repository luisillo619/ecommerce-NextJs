import Address from "../models/address";
import ErrorHandler from "../utils/errorHandler";
import Joi from "joi";

const addressSchema = Joi.object({
  street: Joi.string().required().messages({
    "string.empty": "La calle es requerida",
  }),
  city: Joi.string().required().messages({
    "string.empty": "La ciudad es requerida",
  }),
  state: Joi.string().required().messages({
    "string.empty": "El estado es requerido",
  }),
  phoneNumber: Joi.string().required().messages({
    "string.empty": "El número de teléfono es requerido",
  }),
  zipCode: Joi.string().required().messages({
    "string.empty": "El código postal es requerido",
  }),
  country: Joi.string().required().messages({
    "string.empty": "El país es requerido",
  }),
});

export const getAddress = async (req, res) => {

  const address = await Address.findById(req.query.id);
 
  if (!address) return new ErrorHandler("Direccion no encontrada", 404);

  res.status(200).json({
    address,
  });
};

export const getAddresses = async (req, res) => {
  const addresses = await Address.find({ user: req.user._id });
  res.status(200).json({
    addresses,
  });
};

// validacion desde la coleccion
export const newAddress = async (req, res) => {
  req.body.user = req.user._id; // se agrega la referencia
  const address = await Address.create(req.body);
  res.status(201).json({ address });
};

export const updateAddress = async (req, res) => {
  let address = await Address.findById(req.query.id);
  if (!address) return new ErrorHandler("Direccion no encontrada", 404);
  if (address.user.toString() !== req.user._id) {
    return new ErrorHandler(
      "No tienes permiso para modificar esta direccion",
      401
    );
  }

  const { error } = addressSchema.validate(req.body);
  if (error) {
    throw new ErrorHandler(
      error.details.map((detail) => detail.message).join(", "),
      400
    );
  }

  address = await Address.findByIdAndUpdate(req.query.id, req.body);

  res.status(201).json({ address });
};


export const deleteAddress = async (req, res) => {
  let address = await Address.findById(req.query.id);
  if (!address) return next(new ErrorHandler("Address not found", 404));

  if (address.user.toString() !== req.user._id)
    return new ErrorHandler(
      "No tienes permiso para eliminar esta direccion",
      401
    );

  await Address.findByIdAndRemove(req.query.id);
  res.status(200).json({
    success: true,
  });
};
