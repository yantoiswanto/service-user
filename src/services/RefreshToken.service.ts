import { Request, Response } from 'express';
import db from '../db/models';

class RefreshTokenService {
    credential: {
        id: number,
    };

    body: Request['body'];
    params: Request['params'];
    query: Request['query'];
    res: Response;

    constructor(req: Request, res: Response) {
        this.credential = req.app.locals.credential;
        this.body = req.body;
        this.params = req.params;
        this.query = req.query;
        this.res = res;
    }

    create = async () => {
        try {
            const DB: any = db;
            const userId = this.body.user_id;
            const refreshToken = this.body.refresh_token;

            const user = await DB.Users.findByPk(userId);

            if (!user) {
                return this.res.status(404).send({
                    status: 'error',
                    message: 'User not found',
                });
            }
            console.log(DB);

            const createdRefreshToken = await DB.Refresh_token.create({
                token: refreshToken,
                user_id: userId,
            });

            return this.res.json({
                status: true,
                message: 'Created Refresh Token Success',
                data: {
                    id: createdRefreshToken.id,
                }
            })
        } catch (err: any) {
            return this.res.status(500).json({
                status: false,
                message: 'Internal Server Error',
                data: err.message,
            })
        }
    }


    getToken = async () => {
        try {
            const DB: any = db;
            const refreshToken = this.query.refresh_token;
            const token = await DB.Refresh_token.findOne({
                where: {
                    token: refreshToken,
                }
            });

            if (!token) {
                return this.res.status(404).json({
                    status: false,
                    message: 'Refresh Token not found',
                });
            }

            return this.res.json({
                status: true,
                message: 'Get Refresh Token Success',
                token
            });
        } catch (error: any) {
            return this.res.status(500).json({
                status: false,
                message: 'Internal Server Error',
                data: error.message,
            })
        }
    }

}

export default RefreshTokenService;