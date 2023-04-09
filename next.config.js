/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_URI:
      "mongodb+srv://luisillo619:lk4QkIl1RifmMURK@cluster0.kfbo8t5.mongodb.net/ecommerce?retryWrites=true&w=majority",
      API_URL:
      "http://localhost:3000"
  },
  images:{
    domains: ["res.cloudinary.com"]
  }
};

module.exports = nextConfig;
