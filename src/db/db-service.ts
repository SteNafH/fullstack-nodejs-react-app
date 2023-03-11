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

    public checkConnection = () => {
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

    public query = <T extends OkPacket | RowDataPacket[] | OkPacket[]>(sql: string, values?: any[]): Promise<T> => {
        return new Promise<T>((resolve, reject) => {
            if (!this.dbInstance) {
                reject('Database not initialized');
                return;
            }

            const callback = (error: QueryError | null, result: T) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            };

            this.dbInstance.query<T>(sql, values, callback);
        }).catch((err) => {
            throw new InternalServerException('Query failed', err);
        });
    }
}

export default new DBService();
