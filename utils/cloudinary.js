require('dotenv').config();

const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload function
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        console.log("File uploaded to Cloudinary:", response.url);

        fs.unlinkSync(localFilePath); // remove local file after upload

        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath); // cleanup on failure
        console.error("Cloudinary upload error:", error);
        return null;
    }
};

module.exports =  uploadOnCloudinary;
