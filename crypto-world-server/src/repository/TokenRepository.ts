import StatusEnum from "../model/enums/StatusEnum";
import { ResponseMessage } from "../model/response/ResponseMessage";
import {TokenQueryProcessor} from "../query_processor/TokenQueryProcessor";
import { UserQueryProcessor } from "../query_processor/UserQueryProcessor";
const constants = require('../constants/constants');

export class TokenRepository {

    public static async createToken(name: String, price: number, ico: number, user_id: number) {
        try {
            let user = await UserQueryProcessor.getUser(user_id);
            if(user.balance < constants.AMOUNT_OF_MONEY) return new ResponseMessage("User does not have enough money to create token.", "400", null);

            await UserQueryProcessor.payToken(user_id, constants.AMOUNT_OF_MONEY);
            let result = await TokenQueryProcessor.saveToken(name, price, ico, user_id);
            if(!result) return new ResponseMessage("Error on the server.", "500", null);
            return new ResponseMessage("Success", "200", null);
        } catch(err) {
            console.log(err);
        }
    }

    public static async approveTokenIssue(id: number) {
        try {
            let token = await TokenQueryProcessor.findTokenById(id);
            if(!token) return new ResponseMessage(`Token with id ${id} does not exist.`, "400", null);
            if(token.status != StatusEnum.PENDING) return new ResponseMessage(`Status of token is not PENDING.`, "400", null);

            let result = await TokenQueryProcessor.tokenIssueStatus(id, StatusEnum.APPROVED);
            if(!result) return new ResponseMessage("Error on the server.", "500", null);

            result = await TokenQueryProcessor.createPortfolio(token.issuer, token.token_id, token.ico);
            if(!result) return new ResponseMessage("Error on the server.", "500", null);
            return new ResponseMessage("Success", "200", null);
        } catch(err) {
            console.log(err);
        }
    }

    public static async rejectTokenIssue(id: number) {
        try {
            let token = await TokenQueryProcessor.findTokenById(id);
            if(!token) return new ResponseMessage(`Token with id ${id} does not exist.`, "400", null);

            let user = await UserQueryProcessor.getUser(token.issuer);
            await UserQueryProcessor.getMoneyBack(user.user_id, constants.AMOUNT_OF_MONEY);

            let result = await TokenQueryProcessor.tokenIssueStatus(id, StatusEnum.REJECTED)
            if(!result) return new ResponseMessage("Error on the server.", "500", null);
            return new ResponseMessage("Success", "200", null);
        } catch(err) {
            console.log(err);
        }
    }

    public static async createTokenPurchaseRequest(token_id: number, amount: number, user_id: number, token_owner_id: number) {
        try {
            let token = await TokenQueryProcessor.findTokenById(token_id);
            if(!token) return new ResponseMessage(`Token with id ${token_id} does not exist.`, "400", null);
            if(token.status != StatusEnum.APPROVED) return new ResponseMessage(`Token is not active.`, "400", null);

            let ownerToken = await TokenQueryProcessor.findPortfolio(token_owner_id, token_id);
            if(!ownerToken) return new ResponseMessage(`Token NOT FOUND.`, "400", null);
            if(ownerToken.amount < amount) return new ResponseMessage(`There are not enough tokens.`, "400", null);

            let result = await TokenQueryProcessor.createTokenPurchaseRequest(token_id, amount, user_id, token_owner_id);
            if(!result) return new ResponseMessage("Error on the server.", "500", null);
            return new ResponseMessage("Success", "200", null);
        } catch(err) {
            console.log(err);
        }
    }

    public static async approveTokenPurchaseRequest(id: number, token_owner_id: number) {
        try {
            let tokenPurchaseRequest = await TokenQueryProcessor.findPurchaseRequest(id);
            if(!tokenPurchaseRequest) return new ResponseMessage(`Request NOT FOUND.`, "400", null);

            if(token_owner_id != tokenPurchaseRequest.owner_id) return new ResponseMessage("Forbidden", "403", null);

            let owner_portfolio = await TokenQueryProcessor.findPortfolio(token_owner_id, tokenPurchaseRequest.token_id);
            if(!owner_portfolio) return new ResponseMessage(`User ${token_owner_id} is not owner of token ${tokenPurchaseRequest.token_id}.`, "400", null);
            if(owner_portfolio.amount < tokenPurchaseRequest.amount) return new ResponseMessage(`User does not have enough tokens.`, "400", null);

            let user = await UserQueryProcessor.getUser(tokenPurchaseRequest.user_id);
            let token = await TokenQueryProcessor.findTokenById(tokenPurchaseRequest.token_id);
            if(user.balance < (tokenPurchaseRequest.amount*token.price)) return new ResponseMessage(`You do not have enough money.`, "400", null);
            await UserQueryProcessor.payToken(user.user_id, (tokenPurchaseRequest.amount*token.price));
            await UserQueryProcessor.getMoneyBack(token_owner_id, (tokenPurchaseRequest.amount*token.price));
            await UserQueryProcessor.removeTokensToUser(token_owner_id, tokenPurchaseRequest.token_id, tokenPurchaseRequest.amount);

            let result = await TokenQueryProcessor.approveTokenPurchaseRequest(id);
            if(!result) return new ResponseMessage("Error on the server.", "500", null);
            
            let user_portfolio = await TokenQueryProcessor.findPortfolio(tokenPurchaseRequest.user_id, tokenPurchaseRequest.token_id);
            if(!user_portfolio)  await TokenQueryProcessor.createPortfolio(tokenPurchaseRequest.user_id, tokenPurchaseRequest.token_id, tokenPurchaseRequest.amount)
            else await UserQueryProcessor.removeTokensToUser(token_owner_id, tokenPurchaseRequest.token_id, tokenPurchaseRequest.amount);

            return new ResponseMessage("Success", "200", null);
        } catch(err) {
            console.log(err);
        }
    }

    public static async getAllIssuedTokens(user_id: number) {
        try {
            let user = await UserQueryProcessor.getUser(user_id);
            if(!user) return new ResponseMessage(`User with id ${user_id} does not exist.`, "400", null);
            let result = await TokenQueryProcessor.getIssuedTokens(user_id);
            if(!result) return new ResponseMessage("Error on the server.", "500", null);            
            return new ResponseMessage("Success", "200", result);
        } catch(err) {
            console.log(err);
        }
    }

    public static async getActiveTokens() {
        try{
            let result = await TokenQueryProcessor.getActiveTokens();
            if(!result) return new ResponseMessage("Error on the server.", "500", null);           
            return new ResponseMessage("Success", "200", result);
        } catch(err) {
            console.log(err);
        }
    }

    public static async getAllHoldersToken(token_id: number) {
        try {
            let result = await TokenQueryProcessor.getAllHoldersToken(token_id);
            if(!result) return new ResponseMessage("Error on the server.", "500", null);
            return new ResponseMessage("Success", "200", result);
        } catch (err) {
            console.log(err);
        }
    }

    public static async getTopHoldersToken(token_name: string) {
        try {
            let token = await TokenQueryProcessor.findTokenByName(token_name);
            if(!token) return new ResponseMessage(`Token with name ${token_name} does not exist.`, "400", null);
            
            let result = await TokenQueryProcessor.getTopHoldersToken(token_name);
            if(!result) return new ResponseMessage("Error on the server.", "500", null);
            return new ResponseMessage("Success", "200", result);
        } catch (err) {
            console.log(err);
        }
    }
}