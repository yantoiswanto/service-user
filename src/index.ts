import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { config as dotenv } from 'dotenv';

//Routers
import UsersRouter from './routers/Users.router';
import refreshTokenRouter from './routers/RefreshToken.router';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
        dotenv();
    }

    protected plugins(): void {
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }

    protected routes(): void {
        this.app.route('/').get((req: Request, res: Response) => {
            res.send('Router Typescript');
        });

        this.app.use('/api/v1/users', UsersRouter);
        this.app.use('/api/v1/refresh-token', refreshTokenRouter);

    }
}

const port: number = 8002;
const app = new App().app;

app.listen(port, () => {
    console.log("app is running on port " + port);

    console.log(process.env.NODE_ENV);
});

