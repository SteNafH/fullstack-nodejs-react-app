import Config from './configs/config.js';
import ExpressLoader from './loaders/express.loader.js';
import RoutesLoader from './loaders/routes.loader.js';
import DatabaseLoader from './loaders/database.loader.js';

const app = ExpressLoader.init();

await DatabaseLoader.init();

const version = "v1";
RoutesLoader.initRoutes(app, version);

const port = Number(Config.PORT);

if (Config.NODE_ENV !== 'test')
    app.listen(port, () => console.log(`
      ==================================
      🚀 Server running on port ${port}!🚀
      ==================================
    `));

export default app;
