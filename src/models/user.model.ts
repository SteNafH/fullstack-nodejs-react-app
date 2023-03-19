import DBService from '../db/db-service';
import tableNames from '../utils/tableNames.utils';
import { multipleFilterSet } from '../utils/common.utils';
import { OkPacket, RowDataPacket } from 'mysql2';

export interface User {
    id: string;
    email: string;
    password: string;
}

interface UserPacket extends User, RowDataPacket {
}

class UserModel {
    public find = async (params: object): Promise<User> => {
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
}

export default UserModel;
