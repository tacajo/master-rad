import {PostgresDB} from "../config/PostgresDB";


export class TransactionQueryProcessor {

    public static async addTransaction(paymentId: any, user_id: any, amount:any) {
        let query = 'INSERT INTO public.transaction (payment_id, user_id, amount) VALUES ($1, $2, $3);'
        let result = await PostgresDB.client.query(query, [paymentId, user_id, amount]);
        return result.rows;
    }

    public static async getTransaction(paymentId: any) {
        let query = 'SELECT * FROM public.transaction WHERE payment_id = $1'
        let result = await PostgresDB.client.query(query, [paymentId]);
        return result.rows[0];
    }
}
