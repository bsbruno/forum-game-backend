import IUserRepository from "../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import IStorageProvider from "@shared/container/StorageProvider/models/IStorageProvider";
import Users from "../infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";

interface IRequest {
    user_id: string;
    avataFileName: string;
}

@injectable()
export default class UpdateProfileAvatarService {
    constructor(
        @inject("StorageProvider")
        private storageProvide: IStorageProvider,

        @inject("UserRepository")
        private userRepo: IUserRepository
    ) {}

    public async execute({ avataFileName, user_id }: IRequest): Promise<Users> {
        const user = await this.userRepo.findById(user_id);

        if (!user) {
            throw new AppError("User Invalis", 401);
        }
        if (user.avatar) {
            await this.storageProvide.deleteFile(user.avatar);
        }

        const filename =  await this.storageProvide.saveFile(avataFileName);
        user.avatar = filename;
        await this.userRepo.save(user);
        return user;
    }
}
