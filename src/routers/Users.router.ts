import BaseRoutes from './Base.router';
import Validation from '../middlewares/UserValidator';

//Controllers
import UsersController from '../controllers/Users.controller';

class UsersRouter extends BaseRoutes {
    public routes(): void {
        this.router.post('/register', Validation.register, UsersController.register);
        this.router.post('/login', Validation.login, UsersController.login);
        this.router.post('/logout', UsersController.logout);
        this.router.put('/:id', Validation.update, UsersController.update);
        this.router.get('/:id', UsersController.getUser);
        this.router.get('/', UsersController.getUsers);

    }
}

export default new UsersRouter().router;
