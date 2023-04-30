// LOCAL:

// import cloudinary from "cloudinary"

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,

// })

// const uploads = (file,folder) =>{
//     return new Promise((resolver,reject) =>{
//         cloudinary.uploader.upload(
//             file,
//             (result) => {
//                 resolver({
//                     public_id: result.public_id,
//                     url: result.url
//                 })
//             },
//             {
//                 resource_type: "auto",
//                 folder: folder
//             }
//         )

//     })
// }

// export {uploads, cloudinary}

// DEPLOYADO:
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploads = (fileBuffer, folder) => {
  // Convertir el búfer en un Data URI
  const dataURI = `data:image/jpeg;base64,${fileBuffer.toString("base64")}`;

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      dataURI,
      (result) => {
        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      },
      {
        resource_type: "image",
        folder: folder,
      }
    );
  });
};

export { uploads, cloudinary };
