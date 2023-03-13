import { Express } from 'express';
import productRouter from '../routes/product.routes';

class RoutesLoader {
    public static initRoutes(app: Express, version: string) {
        app.use(`/api/${version}/products`, productRouter);
    }
}

export default RoutesLoader;
