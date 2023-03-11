import { Express } from 'express';
import userRouter from '../routes/user.routes';

class RoutesLoader {
    public static initRoutes(app: Express, version: string) {
        app.use(`/api/${version}/users`, userRouter);
    }
}

export default RoutesLoader;
