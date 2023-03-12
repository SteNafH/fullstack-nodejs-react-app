import { Express } from 'express';
import productRouter from '../routes/product.routes';
import appRouter from '../routes/app.routes';

class RoutesLoader {
    public static initRoutes(app: Express, version: string) {
        app.use(`/`, appRouter);
        app.use(`/api/${version}/products`, productRouter);
    }
}

export default RoutesLoader;
