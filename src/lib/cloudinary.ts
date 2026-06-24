import { v2 as cloudinary } from "cloudinary";

const isConfigured = 
  !!(process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET);

if (isConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
}

export { cloudinary };

/**
 * Uploads a file buffer stream to Cloudinary
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  folder: string,
  fileName?: string
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    if (!isConfigured) {
      return reject(new Error("Cloudinary credentials are not configured in environment variables."));
    }

    // Generate a unique public ID using filename prefix
    let publicId = undefined;
    if (fileName) {
      const baseName = fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
      const cleanName = baseName.replace(/[^a-zA-Z0-9]/g, "_");
      publicId = `${Date.now()}-${cleanName}`;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `harvest_church/${folder}`,
        resource_type: "auto",
        public_id: publicId
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            url: result.secure_url,
            publicId: result.public_id
          });
        } else {
          reject(new Error("Unknown Cloudinary upload error."));
        }
      }
    );

    uploadStream.end(buffer);
  });
}
