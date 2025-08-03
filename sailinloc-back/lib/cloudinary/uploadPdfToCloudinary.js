const cloudinary = require('cloudinary').v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload un PDF sur Cloudinary.
 * @param {Buffer} pdfBuffer - Le contenu du PDF.
 * @param {string} filename - Le nom du fichier (sans extension).
 * @returns {Promise<string>} - URL du PDF hébergé.
 */
async function uploadPDFToCloudinary(pdfBuffer, filename) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        public_id: `contrats/${filename}`,
        format: 'pdf',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    ).end(pdfBuffer);
  });
}

module.exports = uploadPDFToCloudinary;
