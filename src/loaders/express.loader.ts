import express from 'express';
import cors from 'cors';

class ExpressLoader {
    public static init() {
        const app = express();

        app.use(express.json());

        app.use(cors());
        app.options('*', cors());

        return app;
    }
}

export default ExpressLoader;
