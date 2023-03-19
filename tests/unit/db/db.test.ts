import DbService from '../../../src/db/db-service';
import { ConnectionFailedException } from '../../../src/utils/exceptions/database.exception';
import { InternalServerException } from '../../../src/utils/exceptions/api.exception';
import Config from '../../../src/configs/config';

afterEach(() => {
    return new Promise((resolve) => {
        DbService.disconnect()
            .then(resolve);
    });
});

describe('Db', () => {
   describe('checkConnection()', () => {
      test('should throw connection failed error because not initalized', async () => {
          await expect(DbService.checkConnection).rejects.toThrow(ConnectionFailedException);
      });

       test('should throw connection failed error because credentials are wrong', async () => {
           DbService.init('', '', '', '', 0);
           await expect(DbService.checkConnection).rejects.toThrow(ConnectionFailedException);
       });
   });

    describe('query()', () => {
        test('should throw InternalServerException because not initalized', async () => {
            await expect(DbService.query).rejects.toThrow(InternalServerException);
        });
    });

    describe('disconnect()', () => {
        test('should return false because not initalized', async () => {
            await expect(DbService.disconnect()).resolves.toBe(false);
        });

        test('should return true', async () => {
            DbService.init(Config.DB_HOST, Config.DB_USER, Config.DB_PASS, Config.DB_DATABASE, Number(Config.DB_PORT));
            await expect(DbService.disconnect()).resolves.toBe(true);
        });
    });
});
