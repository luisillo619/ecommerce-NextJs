// LOCAL:
// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg"
//   ) {
//     cb(null, true);
//   } else {
//     const error =
//       "Formato de archivo no soportado. Se aceptan solo JPEG/JPG O PNG";
//     cb(error, false);
//   }
// };

// const upload = multer({
//   storage,
//   limits: { fieldSize: 1024 * 1024 },
//   fileFilter,
// });

// export default upload;

//DEPLOYADO SE GUARDA EN LA MEMORIA DEL SERVER Y SE BORRA AUTOMATICAMENTE:
import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    const error =
      "Formato de archivo no soportado. Se aceptan solo JPEG/JPG O PNG";
    cb(error, false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter,
});

export default upload;
