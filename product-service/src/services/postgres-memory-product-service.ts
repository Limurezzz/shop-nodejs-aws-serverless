import { ProductServiceInterface, ProductInterface } from './products';
import { Client, QueryConfig } from 'pg';

class PostgresProductService implements ProductServiceInterface {

    private tableName1 = 'products';
    private tableName2 = 'stocks';

    constructor(private databaseClient: Client){}

    async getProductById(id: string): Promise<ProductInterface> {

        const query = {
            text: `SELECT p.*,s.count FROM ${this.tableName1} p JOIN ${this.tableName2} s ON p.id = s.product_id WHERE p.id = $1`,
            values: [id],
        } as QueryConfig;

        const result = await  this.databaseClient.query(query);
        return result.rows[0] ? result.rows[0] : null;
    }

    async getAllProducts(): Promise<ProductInterface[]> {
        const query = {
            text: `SELECT p.*,s.count FROM ${this.tableName1} p JOIN ${this.tableName2} s ON p.id = s.product_id`
        } as QueryConfig;

        const result = await this.databaseClient.query(query);
        return result.rows ? result.rows : null;
    }

    async create(product: Pick<ProductInterface, 'title' | 'description' | 'price' | 'logo' | 'count'>) {
        const query = {
            text: `WITH val AS(
                        INSERT INTO ${this.tableName1} (title, description, price, logo) VALUES($1, $2, $3, $4) RETURNING id)
                    INSERT INTO stocks (product_id, count)
                    SELECT id, $5
                    FROM val`,
            values: [product.title, product.description, product.price, product.logo, product.count],
        };
        const result = await this.databaseClient.query(query);
        return result.rows[0] ? result.rows[0] : null;
    }
}

export { PostgresProductService };