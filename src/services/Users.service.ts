import { Request, Response } from 'express';
import db from '../db/models';
import Authentication from '../utils/Authentication';

class UsersService {

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

    register = async () => {
        try {
            const DB: any = db;

            const user = await DB.Users.findOne({
                where: { email: this.body.email }
            })

            if (user) {
                return this.res.status(404).json({
                    status: false,
                    message: 'Email already exists'
                })
            }

            const password = await Authentication.passwordHash(this.body.password);

            const newUser = await DB.Users.create({
                name: this.body.name,
                email: this.body.email,
                password: password,
                role: 'user',
                is_active: 1,
                no_telphone: this.body.no_telphone,
                avatar: this.body.avatar
            });

            return this.res.json({
                status: true,
                message: 'Register Success',
                data: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                    is_active: newUser.is_active,
                    no_telphone: newUser.no_telphone,
                    avatar: newUser.avatar

                }
            });
        } catch (error: any) {
            return this.res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }

    login = async () => {
        try {
            const DB: any = db;
            const user = await DB.Users.findOne({
                where: { email: this.body.email }
            });

            if (!user) {
                return this.res.status(404).json({
                    status: false,
                    message: 'Email not found'
                });
            }

            const isPasswordValid = await Authentication.passwordCompare(this.body.password, user.password);
            if (!isPasswordValid) {
                return this.res.status(404).json({
                    status: false,
                    message: 'Password invalid'
                })
            }

            return this.res.json({
                status: true,
                message: 'Login Success',
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    is_active: user.is_active,
                    no_telphone: user.no_telphone,
                    avatar: user.avatar

                }
            });

        } catch (error: any) {
            return this.res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }

    update = async () => {
        try {
            const DB: any = db;
            const { id } = this.params;
            const user = await DB.Users.findByPk(id);
            if (!user) {
                return this.res.status(404).json({
                    status: false,
                    message: 'User not found'
                })
            }



            const email = this.body.email;
            if (email) {
                const userEmail = await DB.Users.findOne({
                    where: { email }
                });
                if (userEmail && email !== user.email) {
                    return this.res.status(404).json({
                        status: false,
                        message: 'Email already exists'
                    })
                }
            }

            const password = await Authentication.passwordHash(this.body.password);

            const users = await DB.Users.update({
                name: this.body.name,
                email: this.body.email,
                password: password,
                role: this.body.role,
                is_active: this.body.is_active,
                no_telphone: this.body.no_telphone,
                avatar: this.body.avatar
            }, {
                where: { id: id }
            });

            return this.res.json({
                status: true,
                message: 'Update Success',
                data: {
                    id: users[0],
                    name: this.body.name,
                    email: this.body.email,
                    role: this.body.role,
                    is_active: this.body.is_active,
                    no_telphone: this.body.no_telphone,
                    avatar: this.body.avatar
                }
            });

        } catch (error: any) {
            return this.res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

    getUser = async () => {
        try {
            const DB: any = db;
            const { id } = this.params;
            const user = await DB.Users.findByPk(id, {
                attributes: ['id', 'name', 'email', 'role', 'is_active', 'no_telphone', 'avatar']
            });
            if (!user) {
                return this.res.status(404).json({
                    status: false,
                    message: 'User not found'
                });
            }

            return this.res.json({
                status: true,
                message: 'Get User Success',
                data: user
            });
        } catch (error: any) {
            return this.res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

    getUsers = async () => {
        try {
            const DB: any = db;

            const userIds = this.query.user_ids || [];

            const sqlOptions: any = {
                attributes: ['id', 'name', 'email', 'role', 'is_active', 'no_telphone', 'avatar']
            };

            if (userIds.length) {
                sqlOptions.where = { id: userIds };
            }

            const users = await DB.Users.findAll(sqlOptions);
            if (!users) {
                return this.res.status(404).json({
                    status: false,
                    message: 'User not found'
                });
            }

            return this.res.json({
                status: true,
                message: 'Get Users Success',
                data: users
            });
        } catch (error: any) {
            return this.res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }


    logout = async () => {
        try {
            const DB: any = db;
            const { user_id } = this.body;
            console.log(user_id);
            const user = await DB.Users.findByPk(user_id);
            if (!user) {
                return this.res.status(404).json({
                    status: false,
                    message: 'User not found'
                });
            }

            await DB.Refresh_token.destroy({
                where: { user_id }
            });

            return this.res.json({
                status: true,
                message: 'Logout Success'
            });
        } catch (error: any) {
            return this.res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }


}

export default UsersService;