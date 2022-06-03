import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
const __dirname = path.resolve();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "3팀 version 3.0 API Docs",
      version: "1.0.0",
      description: "3팀 version 3.0의 API 문서입니다. ",
    },
    components: {
      securitySchemes: {
        Authorization: {
          type: "http",
          scheme: "Bearer",
          name: "Authorization",
          bearerFormat: "JWT",
          in: "header",
        },
      },
    },
  },
  swagger: "2.0",
  basePath: "localhost:5005/",
  apis: [__dirname + "/src/routers/*.js", __dirname + "/src/db/schemas/*.js"],
};

export const specs = swaggerJSDoc(options);
