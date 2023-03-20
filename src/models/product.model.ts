import DBService from '../db/db-service';
import { multipleFilterSet } from '../utils/common.utils';
import tableNames from '../utils/tableNames.utils';
import { OkPacket, RowDataPacket } from 'mysql2';

export interface Product {
    id: string;
    name: string;
}

interface ProductPacket extends Product, RowDataPacket {
}

class ProductModel {
    public findAll = async (params?: object): Promise<Product[]> => {
        let sql = `SELECT *
                   FROM ${tableNames.Products}`;

        if (typeof params !== 'object' || !Object.keys(params).length)
            return await DBService.query<ProductPacket[]>(sql);

        const { filterSet, filterValues } = multipleFilterSet(params);
        sql += ` WHERE ${filterSet}`;

        return await DBService.query<ProductPacket[]>(sql, [...filterValues]);
    }

    public find = async (params: object): Promise<Product> => {
        const { filterSet, filterValues } = multipleFilterSet(params);
        const sql = `SELECT *
                     FROM ${tableNames.Products}
                     WHERE ${filterSet} LIMIT 1`;

        const products = await DBService.query<ProductPacket[]>(sql, [...filterValues]);
        return products[0];
    }

    public create = async (product: Product): Promise<string> => {
        const sql = `INSERT INTO ${tableNames.Products}
                         (id, name)
                     VALUES (?, ?)`;

        await DBService.query<OkPacket>(sql, [product.id, product.name]);
        return product.id;
    }

    public delete = async (id: string): Promise<string> => {
        const sql = `DELETE
                     FROM ${tableNames.Products}
                     WHERE id = ?`;

        await DBService.query<OkPacket>(sql, [id]);
        return id;
    }

    public deleteAll = async (): Promise<void> => {
        const sql = `DELETE
                     FROM ${tableNames.Products}`;

        await DBService.query<OkPacket>(sql);
    }
}

export default ProductModel;
