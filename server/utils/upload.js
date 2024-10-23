const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getMilliseconds() + file.originalname);
  },
});
const fs = require("fs");
const { Cloudinary_API_Secret, Cloudinary_API_KEY, Cloud_Name } = process.env;
cloudinary.config({
  cloud_name: Cloud_Name,
  api_key: Cloudinary_API_KEY,
  api_secret: Cloudinary_API_Secret,
});

// const upload = multer({ storage: storage }).array("images", 4);
const upload = multer({ storage: storage }).any();

async function uploadToCloudinary(locaFilePath, localFileName, mainFolderName) {
  let fileNameWithoutExtension = localFileName.split(".")[0];
  var filePathOnCloudinary = mainFolderName + "/" + fileNameWithoutExtension;

  return cloudinary.uploader
    .upload(locaFilePath, {
      resource_type: "auto",
      public_id: filePathOnCloudinary,
    })
    .then((result) => {
      fs.unlinkSync(locaFilePath);
      return {
        message: "Success",
        url: result.url,
      };
    })
    .catch((error) => {
      console.error(error,"xxxxx")
      fs.unlinkSync(locaFilePath);
      return { message: "Fail" };
    });
}

module.exports = {
  upload,
  uploadToCloudinary,
};
