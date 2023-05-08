import nodemailer from "nodemailer";
import ErrorHandler from "./errorHandler";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.NODEMAILER,
  },
});

const welcomeMail = (email, name) => {
  return {
    from: process.env.MY_EMAIL,
    to: email,
    subject: "¡Bienvenido a Buy It Now!",
    html: `
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333;
              background-color: #f0f0f0;
            }
            .container {
              max-width: 600px;
              margin: auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .logo {
              display: block;
              max-width: 200px;
              margin: 0 auto 20px;
              text-align: center;
            }
            .title {
              font-size: 24px;
              font-weight: bold;
              color: #333;
              margin-bottom: 20px;
            }
            .text {
              font-size: 16px;
              line-height: 1.5;
              margin-bottom: 20px;
            }
            .button {
                display: inline-block;
                background-color: #4281F4;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
                font-weight: bold;
              }
          </style>
        </head>
        <body>
          <div class="container">
            <img class="logo" src="https://res.cloudinary.com/drkzjxpza/image/upload/v1683432512/buyitnow/logos/logo_mdusue.png" alt="Buy It Now" />
            <h1 class="title">¡Hola, ${name}! Bienvenido a Buy It Now</h1>
            <p class="text"><b>Estamos muy felices de que te hayas unido a nuestra familia.</b></p>
            <p class="text">En Buy It Now encontrarás una gran variedad de productos a excelentes precios. Estamos comprometidos en ofrecerte la mejor experiencia de compra posible.</p>
            <a href="https://ecommerce-next-js-delta.vercel.app" class="button" style="color: #ffffff">Empieza a comprar</a>
          </div>
        </body>
        </html>
      `,
  };
};

export async function sendWelcomeMail(req) {
  const { email, name } = req.body;
  const mailOptions = welcomeMail(email, name);
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return false;
  }
}

// export async function sendAccountDeletionMail(req, res, next) {
//   const { email, name } = req.body;
//   const mailOptions = accountDeletionMail(email, name);
//   try {
//     return await transporter.sendMail(mailOptions);
//   } catch (error) {
//     return next(new ErrorHandler("Correo no enviado", 400));
//   }
// }
