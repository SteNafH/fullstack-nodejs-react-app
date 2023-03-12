import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs/promises';
import render from '../views/entry-server';
import Config from '../configs/config';

class AppController {
    public getApp = async (req: Request, res: Response) => {
        const html = await fs.readFile(path.resolve(__dirname, Config.NODE_ENV === 'production' ? "../views/index.html" : "../../index.html"), "utf-8");
        const appHtml = render(req.originalUrl);

        res.status(200).set({ "Content-Type": "text/html" }).end(
            html.replace(
                '<!--app-html-->',
                appHtml
            ));
    }
}

export default new AppController();
