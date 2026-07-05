import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME.trim(),
  api_key: process.env.CLOUDINARY_API_KEY.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET.trim(),
});

console.log("Cloud:", process.env.CLOUDINARY_CLOUD_NAME);

try {

    const result = await cloudinary.uploader.upload("./image.jpg");

    console.log("UPLOAD SUCCESS");
    console.log(result);

} catch (err) {

    console.log("UPLOAD FAILED");
    console.log("HTTP:", err.http_code);
    console.log("MESSAGE:", err.message);
    console.dir(err, { depth: null });

}