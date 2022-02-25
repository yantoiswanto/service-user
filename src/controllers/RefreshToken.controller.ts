import { Request, Response } from "express";
import RefreshTokenService from "../services/RefreshToken.service";

class RefreshTokenController {
    create = async (req: Request, res: Response): Promise<Response> => {
        const refreshTokenService = new RefreshTokenService(req, res);
        const result = await refreshTokenService.create();

        return result;
    }

    getToken = async (req: Request, res: Response): Promise<Response> => {
        const refreshTokenService = new RefreshTokenService(req, res);
        const result = await refreshTokenService.getToken();

        return result;
    }
}


export default new RefreshTokenController;