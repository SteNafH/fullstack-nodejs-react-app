import DBService from '../db/db-service.js';
import tableNames from '../utils/tableNames.utils.js';
import { multipleFilterSet } from '../utils/common.utils.js';
import { OkPacket, RowDataPacket } from 'mysql2';

export interface User {
    id: string;
    email: string;
    password: string;
}

interface UserPacket extends User, RowDataPacket {
}

class UserModel {
    public findAll = async (params?: object): Promise<User[]> => {
        let sql = `SELECT *
                   FROM ${tableNames.Users}`;

        if (typeof params !== 'object' || !Object.keys(params).length)
            return await DBService.query<UserPacket[]>(sql);

        const { filterSet, filterValues } = multipleFilterSet(params);
        sql += ` WHERE ${filterSet}`;

        return await DBService.query<UserPacket[]>(sql, [...filterValues]);
    }

    public find = async (params: object): Promise<User | undefined> => {
        const { filterSet, filterValues } = multipleFilterSet(params);
        const sql = `SELECT *
                     FROM ${tableNames.Users}
                     WHERE ${filterSet} LIMIT 1`;

        const users = await DBService.query<UserPacket[]>(sql, [...filterValues]);
        return users[0];
    }

    public create = async (user: User): Promise<string> => {
        const sql = `INSERT INTO ${tableNames.Users}
                         (id, email, password)
                     VALUES (?, ?, ?)`;

        await DBService.query<OkPacket>(sql, [user.id, user.email, user.password]);
        return user.id;
    }

    public deleteAll = async (): Promise<void> => {
        const sql = `DELETE
                     FROM ${tableNames.Users}`;

        await DBService.query<OkPacket>(sql);
    }
}

export default UserModel;
