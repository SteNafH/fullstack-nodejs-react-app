import express from 'express';
import compression from 'compression';
import path from 'path';

class ExpressLoader {
    public static init() {
        const app = express();

        app.use(compression());
        app.use(express.static(path.resolve(__dirname, '../../dist/views')));

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        return app;
    }
}

export default ExpressLoader;
