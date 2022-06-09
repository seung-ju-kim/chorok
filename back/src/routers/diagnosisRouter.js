import { request } from 'express';
import { s3Upload, s3Delete } from "../middlewares/multerS3";

const diagnosisRouter = Router();

diagnosisRouter.post("/",
  s3Upload(),
  async (req, res, next) => {
    try {
      const fileName = req.file.split("/diag_img/")[1];

      const flask = (callback) => {
        const options = {
          method: "POST",
          uri: "http://localhost:8000/test",
          qs: {
            fileName
          }
        };

        request(options, (err, res, body) => {
          callback(undefined, {
            res: body
          });
        });
      };

      flask((err, { res } = {}) => {
        if (err) {
          throw new Error(err);
        }
        const result = JSON.parse(res);
        res.status(201).send(result);
      });
    } catch (error) {
      next(error);
    }
  });

export { diagnosisRouter };
