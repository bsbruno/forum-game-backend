import AppError from "@shared/errors/AppError";
import { isAfter, addHours } from "date-fns";
import { inject, injectable } from "tsyringe";
import IHashProvider from "../HashProvider/models/IHashProvider";
import IUserRepository from "../repositories/IUserRepository";
import IUserTokenRepository from "../repositories/IUserTokenRepository";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
export default class ResetPasswordService {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,

        @inject("BCryptHash")
        private hasProvider: IHashProvider,

        @inject("UserTokenRepository")
        private userTokenRepository: IUserTokenRepository
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);
        if (!userToken) {
            throw new AppError("User Token does not Exist");
        }

        const user = await this.userRepository.findById(userToken.user_id);
        if (user?.password === password) {
            throw new AppError("this password has already been registered");
        }

        if (!user) {
            throw new AppError("User does not Exist");
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 1);
        if (isAfter(Date.now(), compareDate)) {
            throw new AppError("Token Expired ");
        }

        user.password = await this.hasProvider.generateHash(password);

        await this.userRepository.save(user);
    }
}
