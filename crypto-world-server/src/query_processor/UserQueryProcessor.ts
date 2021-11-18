import {PostgresDB} from "../config/PostgresDB";
import RoleEnum from "../model/enums/RoleEnum";
const constants = require('../constants/constants');

export class UserQueryProcessor {
    
    public static async getAllUsers() {
        let query = 'SELECT * FROM public."user"';
        let result = await PostgresDB.client.query(query, []);
        return result.rows;
    }

    public static async getUserByEmail(email: String) {
        let query = 'SELECT * FROM public."user" where email = $1';
        let result = await PostgresDB.client.query(query, [email]);
        return result.rows[0];
    }

    public static async getUser(id : Number) {
        let query = 'SELECT * FROM public."user" where user_id = $1';
        let result = await PostgresDB.client.query(query, [id]);
        return result.rows[0];
    }

    public static async registerUser(firstName: String, lastName: String, company: String, balance: Number, birthday : any, titleInTheCompnay : String,
        email: String, password: String) {
        let query = 'INSERT INTO public."user" (first_name, last_name, registration_date, company, banned, balance, role, birthday, title_in_the_company, email, password) VALUES ($1, $2, to_timestamp(($3) / 1000.0), $4, $5, $6, $7, $8, $9, $10, $11)  RETURNING *';
        let result = await PostgresDB.client.query(query, [firstName, lastName, Date.now(), company, false, balance, RoleEnum.USER, birthday, titleInTheCompnay, email, password]);
        return result.rows;
    }

    public static async banUser(id: number) {
        let query = 'UPDATE public."user" SET banned = true WHERE user_id = $1;'
        let result = await PostgresDB.client.query(query, [id]);
        return result.rows;
    }

    public static async payToken(id: number, amount: number){
        let query = 'UPDATE public."user" SET balance = (balance - $1) WHERE user_id = $2;'
        let result = await PostgresDB.client.query(query, [ amount, id]);
        return result.rows;
    }

    public static async getMoneyBack(id: number, amount: number){
        let query = 'UPDATE public."user" SET balance = (balance + $1) WHERE user_id = $2;'
        let result = await PostgresDB.client.query(query, [amount, id]);
        return result.rows;
    }

    public static async addTokensToUser(user_id: number, token_id: number, amount: number) {
        let query = 'UPDATE public.portfolio SET amount = amount + $1 WHERE user_id = $2 and token_id = $3;'
        let result = await PostgresDB.client.query(query, [ amount, user_id, token_id]);
        return result.rows;
    }

    public static async removeTokensToUser(user_id: number, token_id: number, amount: number) {
        let query = 'UPDATE public.portfolio SET amount = amount - $1 WHERE user_id = $2 and token_id = $3;'
        let result = await PostgresDB.client.query(query, [ amount, user_id, token_id]);
        return result.rows;
    }

}