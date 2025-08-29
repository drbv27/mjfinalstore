import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  clous_name: process.CLOUDINARY_CLOUD_NAME,
  api_key: process.CLOUDINARY_API_KEY,
  api_secret: process.CLOUDINARY_API_SECRET,
});

export default cloudinary;
