const path = require("path");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const requiredEnvVars = [
  "IMAGEKIT_PUBLIC_KEY",
  "IMAGEKIT_PRIVATE_KEY",
  "IMAGEKIT_URL_ENDPOINT",
];

function getMissingImageKitVars() {
  return requiredEnvVars.filter((key) => !process.env[key]);
}

function createImageKitClient() {
  return new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  });
}

async function uploadBlogCover(file) {
  const missingVars = getMissingImageKitVars();
  if (missingVars.length) {
    throw new Error(
      `ImageKit is not configured. Missing: ${missingVars.join(", ")}`
    );
  }

  const imageKit = createImageKitClient();
  const uploadFile = await toFile(file.buffer, file.originalname);
  const sanitizedName = `${Date.now()}-${path
    .basename(file.originalname)
    .replace(/\s+/g, "-")}`;

  const response = await imageKit.files.upload({
    file: uploadFile,
    fileName: sanitizedName,
    folder: "/blogify-journal/covers",
    useUniqueFileName: true,
    tags: ["blogify", "cover-image"],
  });

  return response.url;
}

module.exports = {
  getMissingImageKitVars,
  uploadBlogCover,
};
