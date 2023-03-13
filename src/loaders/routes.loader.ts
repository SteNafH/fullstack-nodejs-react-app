import { Express } from 'express';
import userRouter from '../routes/user.routes';
import productRouter from '../routes/product.routes';

class RoutesLoader {
    public static initRoutes(app: Express, version: string) {
        app.use(`/api/${version}/users`, userRouter);
        app.use(`/api/${version}/products`, productRouter);
    }
}

export default RoutesLoader;
