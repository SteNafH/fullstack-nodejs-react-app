import DBService from '../db/db-service';
import { multipleFilterSet } from '../utils/common.utils';
import tableNames from '../utils/tableNames.utils';

class UserModel {
    public findAll = async (params?: object) => {
        let sql = `SELECT * FROM ${tableNames.Users}`;

        if (typeof params !== 'object' || !Object.keys(params).length) {
            return await DBService.query(sql);
        }

        const { filterSet, filterValues } = multipleFilterSet(params);
        sql += ` WHERE ${filterSet}`;

        return await DBService.query(sql, [...filterValues]);
    }
}

export default new UserModel();
