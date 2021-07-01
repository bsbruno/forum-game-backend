import { container } from "tsyringe";

import IUserRepository from "@modules/users/repositories/IUserRepository";
import UserRepository from "@modules/users/infra/typeorm/repositories/UserRepository";

import IHashProvider from "@modules/users/HashProvider/models/IHashProvider";
import BCryptHash from "@modules/users/HashProvider/implementations/BCryptHash";

import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";
import UserTokenRepository from "@modules/users/infra/typeorm/repositories/UserTokenRepository";

import IMailProvider from "./IMailProvider/models/IMailProvider";
import EtheralMailProvider from "./IMailProvider/implementations/EtherealMailProvider";

import IMailTemplateProvider from "../container/MailTemplateProvider/models/IMailTemplateProvider";
import HandlerbarsMailTemplateProvider from "../container/MailTemplateProvider/implementations/HandlerbarsMailTemplateProvider";
import SESMailProvider from "./IMailProvider/implementations/SESMailProvider";

import PostRepository from "@modules/post/infra/typeorm/repositories/PostRepository";
import IPostRepository from "@modules/post/repositories/IPostRepository";

import CommmetsRepository from "@modules/post/infra/typeorm/repositories/CommmetsRepository";
import ICommentsRepository from "@modules/post/repositories/ICommentsRepository";

import IStorageProvider from "../container/StorageProvider/models/IStorageProvider";
import DiskStorageProvider from "../container/StorageProvider/implementations/DiskStorageProvider";
import S3StorageProvider from "./StorageProvider/implementations/S3StorageProvider";

import ICacheProvider from "../container/CacheProvider/models/ICacheProvider";
import RedisCacheProvider from "../container/CacheProvider/implementations/RedisCacheProvider";
import mail from "@config/mail";
import uploadConfig from "@config/upload";
container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<ICacheProvider>(
    "RedisCacheProvider",
    RedisCacheProvider
);

container.registerSingleton<ICommentsRepository>(
    "CommmetsRepository",
    CommmetsRepository
);

container.registerSingleton<IPostRepository>("PostRepository", PostRepository);

container.registerSingleton<IHashProvider>("BCryptHash", BCryptHash);

container.registerSingleton<IUserTokenRepository>(
    "UserTokenRepository",
    UserTokenRepository
);

container.registerSingleton<IMailTemplateProvider>(
    "MailTemplateProvider",
    HandlerbarsMailTemplateProvider
);

container.registerInstance<IMailProvider>(
    "MailProvider",
    mail.driver === "ethereal"
        ? container.resolve(EtheralMailProvider)
        : container.resolve(SESMailProvider)
);

const providers = {
    disk: DiskStorageProvider,
    s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    providers[uploadConfig.driver]
);
