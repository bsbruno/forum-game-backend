import User from '../infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/authJwt';
import IUserRepository from '../repositories/IUserRepository';
import { compare } from 'bcrypt';
import AppError from '@shared/errors/AppError';

interface IRequest {
    email: string;
    password: string;
}

@injectable()
export default class AutheticanteService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute({
        email,
        password,
    }: IRequest): Promise<{ user: User; token: string }> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Email/password is wrong ');
        }
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Email/password is wrong ');
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            user,
            token,
        };
    }
}
