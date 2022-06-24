import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage, Options } from "multer-storage-cloudinary";

declare interface cloudinaryOptions extends Options {
    params: {
        folder: string;
        allowedFormats: string[];
    };
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const multerOpts: cloudinaryOptions = {
    cloudinary: cloudinary,
    params: {
        folder: "bunrisuzip",
        allowedFormats: ["jpeg", "jpg", "png"],
    },
};

const storage = new CloudinaryStorage(multerOpts);

export { cloudinary, storage };
