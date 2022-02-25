import { Request, Response } from 'express';
import UsersService from '../services/Users.service';

class UsersController {
    register = async (req: Request, res: Response): Promise<Response> => {
        const usersService = new UsersService(req, res);
        const result = await usersService.register();

        return result;
    }

    login = async (req: Request, res: Response): Promise<Response> => {
        const usersService = new UsersService(req, res);
        const result = await usersService.login();

        return result;
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const usersService = new UsersService(req, res);
        const result = await usersService.update();

        return result;
    }

    getUser = async (req: Request, res: Response): Promise<Response> => {
        const usersService = new UsersService(req, res);
        const result = await usersService.getUser();

        return result;
    }

    getUsers = async (req: Request, res: Response): Promise<Response> => {
        const usersService = new UsersService(req, res);
        const result = await usersService.getUsers();

        return result;
    }

    logout = async (req: Request, res: Response): Promise<Response> => {
        const usersService = new UsersService(req, res);
        const result = await usersService.logout();

        return result;
    }
}

export default new UsersController;