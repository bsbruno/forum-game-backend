import ProfileShowService from "@modules/users/services/ProfileShowService";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";
import UpdateProfileService from "@modules/users/services/UpdateProfileService";

export default class ProfileShowController {
    public async show(req: Request, res: Response): Promise<Response> {
        const { id_user } = req.user;
        const profileShowService = container.resolve(ProfileShowService);

        const profile = await profileShowService.execute({ id_user });

        return res.json({ users: classToClass(profile) });
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const id_user = req.user.id_user;
        const { name, email, old_password, password, nickname } = req.body;

        const updateProfile = container.resolve(UpdateProfileService);

        const user = await updateProfile.execute({
            id_user,
            email,
            name,
            nickname,
            old_password,
            password,
        });

        return res.json(classToClass(user));
    }
}
