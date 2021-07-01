import User from "../infra/typeorm/entities/User";
import { injectable, inject } from "tsyringe";
import IUserRepository from "../repositories/IUserRepository";

interface IRequest {
    id_user: string;
}

@injectable()
export default class CreateUserService {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}

    public async execute({ id_user }: IRequest): Promise<User | undefined> {
        const checkUserExist = await this.userRepository.findById(id_user);
        if (!checkUserExist) {
            throw new Error("User dosent Exits");
        }

        const user = await this.userRepository.findById(id_user);

        return user;
    }
}
