import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import express from "express";
import fs from "fs";

const router = express.Router();
const path = "C:/vscode/ai_project_team3/back/swaggerDocs/build/bundle.yaml"
const options = yaml.load(fs.readFileSync("../back/swaggerDocs/build/bundle.yaml", "utf8"));

router.use("/docs", swaggerUi.serve, swaggerUi.setup(options));

export default router;

