import Config from './configs/config';
import ExpressLoader from './loaders/express.loader';
import RoutesLoader from './loaders/routes.loader';
import DatabaseLoader from './loaders/database.loader';

const app = ExpressLoader.init();

void DatabaseLoader.init();

const version = "v1";
RoutesLoader.initRoutes(app, version);

const port = Number(Config.PORT);

app.listen(port, () => console.log(`
  ==================================
  🚀 Server running on port ${port}!🚀
  ==================================
`));

export default app;
