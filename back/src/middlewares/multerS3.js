import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3Upload = () => {
  const limits = {
    fileSize: 5242880
  };
  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_S3_BUCKET,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: "public-read",
      key: (req, file, cb) => {
        let ext = file.mimetype.split('/')[1];
        if (!["png", "jpg", "jpeg", "gif", "bmp"].includes(ext)) {
          return cb(new Error("이미지 파일만 업로드 해주세요."));
        }
        const timezoneOffset = new Date().getTimezoneOffset() * 60000;
        const time = new Date(Date.now() - timezoneOffset);
        let newTime = time.toISOString().split("T")[0].replace(/-/gi, "");
        cb(null, `diag_img/${newTime}_${Math.floor(Math.random() * 100000000).toString()}.${ext}`);
      }
    }),
    limits
  }).single("file");

  return upload;
};

const s3Delete = (imageName) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: imageName,
  };

  s3.deleteObject(params, (error, data) => {
    if (error) {
      throw new Error(error);
    } else {
      console.log("Successfully deleted ", params.Key);
    }
  });
};

export { s3Upload, s3Delete };
