import {PostgresDB} from "../config/PostgresDB";
import StatusEnum from "../model/enums/StatusEnum";

export class TokenQueryProcessor {

    public static async findTokenById(id: number) {
        let query = 'SELECT * FROM public.token where token_id = $1';
        let result = await PostgresDB.client.query(query, [id]);
        return result.rows[0];
    }

    public static async findTokenByName(name: string) {
        let query = 'SELECT * FROM public.token where name = $1';
        let result = await PostgresDB.client.query(query, [name]);
        return result.rows[0];
    }

    public static async tokenIssueStatus(id: number, status: number) {
        let query = 'UPDATE public.token SET status = $1 WHERE token_id = $2;'
        let result = await PostgresDB.client.query(query, [status, id]);
        return result.rows;
    }

    public static async saveToken(name: String, price: number, ico: number, issuer: number) {
        let query = 'INSERT INTO public.token (name, price, ico, issuer, issuing_date, status) VALUES ($1, $2, $3, $4, to_timestamp(($5) / 1000.0), $6);'
        let result = await PostgresDB.client.query(query, [name, price, ico, issuer, Date.now(), StatusEnum.PENDING]);
        return result.rows;
    }

    public static async findPortfolio(user_id: number, token_id: number) {
        let query = 'SELECT * FROM public.portfolio where user_id = $1 and token_id = $2;';
        let result = await PostgresDB.client.query(query, [user_id, token_id]);
        return result.rows[0];
    }

    public static async createPortfolio(user_id: number, token_id: number, amount: number) {
        let query = 'INSERT INTO public.portfolio (user_id, token_id, amount) VALUES ($1, $2, $3);'
        let result = await PostgresDB.client.query(query, [user_id, token_id, amount]);
        return result.rows;
    }

    public static async createTokenPurchaseRequest(token_id: number, amount: number, user_id: number, token_owner_id: number) {
        let query = 'INSERT INTO public.token_purchase_request (user_id, owner_id, amount, status, token_id) VALUES ($1, $2, $3, $4, $5);'
        let result = await PostgresDB.client.query(query, [user_id, token_owner_id, amount, StatusEnum.PENDING, token_id]);
        return result.rows;
    }

    public static async approveTokenPurchaseRequest(id: number) {
        let query = 'UPDATE public.token_purchase_request SET status = $1 WHERE request_id = $2;'
        let result = await PostgresDB.client.query(query, [ StatusEnum.APPROVED, id ]);
        return result.rows;
    }

    public static async findPortfolioById(id: number)  {
        let query = 'SELECT * FROM public.portfolio where portfolio_id = $1';
        let result = await PostgresDB.client.query(query, [id]);
        return result.rows[0];
    }

    public static async getIssuedTokens(user_id: number)  {
        let query = 'SELECT * FROM public.token where issuer = $1';
        let result = await PostgresDB.client.query(query, [user_id]);
        return result.rows;
    }

    public static async getActiveTokens()  {
        let query = 'SELECT * FROM public.token where status = $1';
        let result = await PostgresDB.client.query(query, [StatusEnum.APPROVED]);
        return result.rows;
    }

    public static async getAllHoldersToken(token_id: number)  {
        let query = "SELECT * FROM public.portfolio where token_id = $1;";
        let result = await PostgresDB.client.query(query, [token_id]);
        return result.rows;
    }

    public static async getTopHoldersToken(token_name: string)  {
        let query = "SELECT * FROM public.portfolio p INNER JOIN public.token t ON p.token_id = t.token_id WHERE t.name = $1 ORDER BY p.amount DESC;";
        let result = await PostgresDB.client.query(query, [token_name]);
        return result.rows;
    }

    public static async findPurchaseRequest(request_id: number) {
        let query = 'SELECT * FROM public.token_purchase_request where request_id = $1';
        let result = await PostgresDB.client.query(query, [request_id]);
        return result.rows[0];
    }
}