import { Express } from 'express';
import userRouter from '../routes/user.routes';
import productRouter from '../routes/product.routes';
import path from 'path';

class RoutesLoader {
    public static initRoutes(app: Express, version: string) {
        app.use(`/api/${version}/users`, userRouter);
        app.use(`/api/${version}/products`, productRouter);

        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../../dist/views/index.html'));
        });
    }
}

export default RoutesLoader;
