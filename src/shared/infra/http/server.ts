import "reflect-metadata";
import "dotenv/config";
import "@shared/infra/typeorm";
import "@shared/container";
import "express-async-errors";
import express, { json, NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import AppError from "@shared/errors/AppError";
import uploadConfig from "@config/upload";
import swaggerUi from "swagger-ui-express";
import swaggerDock from "./swagger.json";

const app = express();
app.use(cors());
app.use(json());
app.use("/files", express.static(uploadConfig.uploadsFolder));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDock));

app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }

    return res.status(500).json({
        status: "error",
        message: err.message,
    });
});

app.listen(4001, () => {
    console.log("🚀🚀, on port 4001 ");
});
