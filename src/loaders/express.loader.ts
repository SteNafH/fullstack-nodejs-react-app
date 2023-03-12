import express from 'express';
import cors from 'cors';
import compression from 'compression';
import serveStatic from 'serve-static';
import Config from '../configs/config';
import path from 'path';

class ExpressLoader {
    public static init() {
        const app = express();

        if (Config.NODE_ENV === 'production') {
            app.use(compression());
            app.use(serveStatic(path.resolve(__dirname, '../../dist/views'), { index: false }));
        }

        app.use(express.json());

        app.use(cors());
        app.options('*', cors());

        return app;
    }
}

export default ExpressLoader;
