import IMailProvider from "../models/IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import ISendMailDTO from "../dtos/ISendMailDTO";
import { inject, injectable } from "tsyringe";
import IMailTemplateProvider from "../../MailTemplateProvider/models/IMailTemplateProvider";
import mailConfig from "@config/mail";
import aws from "aws-sdk";

@injectable()
export default class SESMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject("MailTemplateProvider")
        private mailTemplateProvider: IMailTemplateProvider
    ) {}

    public async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendMailDTO): Promise<void> {
        const ses = new aws.SES({
            apiVersion: "2010-12-01",
            region: "us-east-2",
        });
        let transporter = nodemailer.createTransport({
            SES: { ses, aws },
        });
        const { email, name } = mailConfig.defaults.from;

        await transporter.sendMail({
            from: {
                name: name,
                address: email,
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.mailTemplateProvider.parser(templateData),
        });
    }
}
