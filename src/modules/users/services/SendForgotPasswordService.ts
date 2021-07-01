import { inject, injectable } from "tsyringe";
import IMailProvider from "@shared/container/IMailProvider/models/IMailProvider";
import IUserRepository from "../repositories/IUserRepository";
import IUserTokenRepository from "../repositories/IUserTokenRepository";
import AppError from "@shared/errors/AppError";
import path from "path";

interface IRequest {
    email: string;
}

@injectable()
export default class SendForgotPasswordService {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,

        @inject("UserTokenRepository")
        private userTokenRepository: IUserTokenRepository,

        @inject("MailProvider")
        private mailProvider: IMailProvider
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const checkUser = await this.userRepository.findByEmail(email);

        if (!checkUser) {
            throw new AppError("User does not exist");
        }
        const { token } = await this.userTokenRepository.generate(checkUser.id);
        console.log(token);

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            "..",
            "views",
            "forgot_password.hbs"
        );
        await this.mailProvider.sendMail({
            to: {
                name: checkUser.name,
                email: checkUser.email,
            },
            subject: "Equipe PostGame❤💌",
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: checkUser.name,
                    link: `http://localhost:3000/reset-password?token=${token}`,
                },
            },
        });
    }
}
