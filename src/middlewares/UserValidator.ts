import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";


const register = [
    check('name').isString().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    check('email').isEmail().withMessage('Email is not valid'),
    check('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() })
        }

        return next();
    }
];

const login = [
    check('email').isEmail().withMessage('Email is not valid'),
    check('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() })
        }

        return next();
    }
];

const update = [
    check('name').isString().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    check('email').isEmail().withMessage('Email is not valid'),
    check('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() })
        }

        return next();
    }
];




export default { register, login, update };