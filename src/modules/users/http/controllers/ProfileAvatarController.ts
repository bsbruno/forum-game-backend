import UpdateProfileAvatarService from "@modules/users/services/UpdateProfileAvatarService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ProfileAvatarController {
    public async update(req: Request, res: Response): Promise<Response> {
        const updateAvatar = container.resolve(UpdateProfileAvatarService);

        const user = await updateAvatar.execute({
            user_id: req.user.id_user,

            avataFileName: req.file!.filename,
        });

        return res.json({ users: classToClass(user) });
    }
}
