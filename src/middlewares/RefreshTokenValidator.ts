import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const create = [
    check('user_id').isInt().withMessage('User ID not valid').isLength({ min: 1 }).withMessage('User ID not null'),
    check('refresh_token').isString().withMessage('Refresh Token not valid').isLength({ min: 1 }).withMessage('Refresh Token not null'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        }

        return next();

    }
];


export default { create }