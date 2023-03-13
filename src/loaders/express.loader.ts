import express from 'express';
import cors from 'cors';
import compression from 'compression';
import path from 'path';

class ExpressLoader {
    public static init() {
        const app = express();

        app.use(compression());
        app.use(express.static(path.resolve(__dirname, '../../dist/views')));

        app.use(express.json());

        app.use(cors());
        app.options('*', cors());

        return app;
    }
}

export default ExpressLoader;
