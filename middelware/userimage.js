const multer = require("multer");
const path = require("path");

const imageConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "..", "/uploads/user_images"));
  },
  filename: (req, file, callback) => {
    callback(null, `image_${Date.now()}.${file.originalname}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("File type is not image"));
  }
};

const userLogoImageUpload = multer({
  storage: imageConfig,
  fileFilter: isImage,
});

module.exports = {
  userLogoImageUpload,
};
