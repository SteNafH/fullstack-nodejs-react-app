export interface Product {
    id: string;
    name: string;
}

class ProductModel {
    public findAll = async (params?: object): Promise<Product[]> => {
        return [{ id: "1", name: "test" }, { id: "2", name: "test1" }];
    }

    public find = async (params: object): Promise<Product> => {
        return { id: "1", name: "test" };
    }

    public create = async (product: Product): Promise<string> => {
        return product.id;
    }

    public delete = async (id: string): Promise<string> => {
        return id;
    }
}

export default new ProductModel();
