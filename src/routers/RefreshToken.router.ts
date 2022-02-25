import BaseRoutes from './Base.router';
import validation from '../middlewares/RefreshTokenValidator';

import RefreshTokenController from '../controllers/RefreshToken.controller';

class RefreshTokenRouter extends BaseRoutes {
    public routes(): void {
        this.router.post('/', validation.create, RefreshTokenController.create);
        this.router.get('/', RefreshTokenController.getToken);
    }
}

export default new RefreshTokenRouter().router;