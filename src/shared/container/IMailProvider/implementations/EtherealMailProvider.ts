import IMailProvider from "../models/IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import ISendMailDTO from "../dtos/ISendMailDTO";
import { inject, injectable } from "tsyringe";
import IMailTemplateProvider from "../../MailTemplateProvider/models/IMailTemplateProvider";

@injectable()
export default class EtheralMailProvider implements IMailProvider {
    private client: Transporter;
    constructor(
        @inject("MailTemplateProvider")
        private mailTemplateProvider: IMailTemplateProvider
    ) {
        nodemailer.createTestAccount().then((account) => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });
            this.client = transporter;
        });
    }

    public async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendMailDTO): Promise<void> {
        const message = await this.client.sendMail({
            from: {
                name: from?.name || " Equipe  Games ",
                address: from?.email || "equipe@gamepost.com.br",
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.mailTemplateProvider.parser(templateData),
        });

        console.log("Message sent: %s", message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
    }
}
