import path from "path";
import fs from "fs";
import uploadConfig from "@config/upload";
import IStorageProvider from "../models/IStorageProvider";
import AppError from "@shared/errors/AppError";
import aws, { S3 } from "aws-sdk";
import mime from "mime";

export default class S3StorageProvider implements IStorageProvider {
    private client: S3;
    constructor() {
        this.client = new aws.S3({
            region: "us-east-2",
        });
    }

    public async saveFile(file: string): Promise<string> {
        const orinalPath = path.resolve(uploadConfig.tmpFolder, file);

        const ContentType = mime.lookup(orinalPath);

        if (!ContentType) {
            throw new Error("File Not found");
        }

        const fileContent = await fs.promises.readFile(orinalPath);
        await this.client
            .putObject({
                Bucket: uploadConfig.config.aws.bucket,
                Key: file,
                ACL: "public-read",
                Body: fileContent,
                ContentType,
                ContentDisposition: `inline; filename=${file}`,
            })
            .promise();

        await fs.promises.unlink(orinalPath);

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: uploadConfig.config.aws.bucket,
                Key: file,
            })
            .promise();
    }
}
