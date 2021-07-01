import User from "../infra/typeorm/entities/User";
import { injectable, inject } from "tsyringe";
import IUserRepository from "../repositories/IUserRepository";
import IHashProvider from "../HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id_user: string;
    name: string;
    email: string;
    nickname: string;
    password?: string;
    old_password?: string;
}

@injectable()
export default class UpdateProfileService {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,

        @inject("BCryptHash")
        private hashProvider: IHashProvider
    ) {}

    public async execute({
        name,
        email,
        password,
        nickname,
        id_user,
        old_password,
    }: IRequest): Promise<User> {
        const user = await this.userRepository.findById(id_user);
        if (!user) {
            throw new AppError("User not found!");
        }

        if (password && !old_password) {
            throw new AppError("You need to inform the old password ");
        }

        if (password && old_password) {
            const checkOldPassword = await this.hashProvider.compareHash(
                old_password,
                user.password
            );
            if (!checkOldPassword)
                throw new AppError("Old password does not match.");

            user.password = await this.hashProvider.generateHash(password);
        }

        user.name = name;
        user.email = email;
        user.nickname = nickname;

        return this.userRepository.save(user);
    }
}
