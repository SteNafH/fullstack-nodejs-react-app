import DbService from '../db/db-service.js';
import Config from '../configs/config.js';

class DatabaseLoader {
    public static async init() {
        DbService.init(Config.DB_HOST, Config.DB_USER, Config.DB_PASS, Config.DB_DATABASE, Config.DB_PORT);
        await DbService.checkConnection();
    }

    public static async disconnect() {
        await DbService.disconnect();
    }
}

export default DatabaseLoader;
