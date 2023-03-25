import mysql2, { OkPacket, Pool, QueryError, RowDataPacket } from 'mysql2';
import { InternalServerException } from '../utils/exceptions/api.exception';
import { ConnectionFailedException } from '../utils/exceptions/database.exception';

class DBService {
    private dbInstance?: Pool;

    public init = (host: string, user: string, password: string, database: string, port: number) => {
        this.dbInstance = mysql2.createPool({
            host: host,
            user: user,
            password: password,
            database: database,
            port: port,
        });
    }

    public checkConnection = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            if (!this.dbInstance) {
                reject('Database is not initialized');
                return;
            }

            this.dbInstance.getConnection((err, connection) => {
                if (err) {
                    reject(err.message);
                    return;
                }

                if (connection) {
                    connection.release();
                    resolve();
                }
            });
        }).catch(err => {
            throw new ConnectionFailedException(err);
        })
    }

    public query = <T extends OkPacket | RowDataPacket[]>(sql: string, values?: any[]): Promise<T> => {
        return new Promise<T>((resolve, reject) => {
            if (!this.dbInstance)
                return reject('Database not initialized');

            const callback = (error: QueryError | null, result: T) => {
                if (error)
                    return reject(error);

                resolve(result);
            };

            this.dbInstance.query<T>(sql, values, callback);
        }).catch((err) => {
            throw new InternalServerException('Query failed', sql);
        });
    }

    public disconnect = (): Promise<boolean> => {
        return new Promise<boolean>((resolve) => {
            if (!this.dbInstance)
                return resolve(false);

            this.dbInstance.end(() => {
                this.dbInstance = undefined;
                resolve(true);
            })
        });
    }
}

export default new DBService();
