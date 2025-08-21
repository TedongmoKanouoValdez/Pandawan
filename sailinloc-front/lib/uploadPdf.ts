// lib/cloudinary/uploadPdf.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadPdfToCloudinary(buffer: Buffer, filename: string) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw', // pour PDF
        folder: 'contrats', // dossier sur cloudinary
        public_id: filename.replace(/\.pdf$/, ''), // nom sans .pdf
        overwrite: true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    ).end(buffer);
  });
}
