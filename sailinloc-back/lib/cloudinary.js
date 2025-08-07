import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default function uploadPDFToCloudinary(buffer, filename) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        folder: 'recus',
        public_id: filename,
        format: 'pdf',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );

    uploadStream.end(buffer);
  });
}
