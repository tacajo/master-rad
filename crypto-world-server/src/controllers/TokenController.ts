import { BodyProp, Get, Path, Post, Put, Query, Request, Route } from "tsoa";
import { TokenRepository } from "../repository/TokenRepository";

@Route("token")
export default class TokenController {

  @Post("")
  public async createToken(@BodyProp("name") name: String, @BodyProp('price') price: number, @BodyProp('ico') ico: number, @Request() req: any) {
    let result = await TokenRepository.createToken(name,price, ico, req.user.id);
    return result;
  }

  @Put("/approve/{id}")
  public async approveToken(@Path('id') id: any) {
    let result = await TokenRepository.approveTokenIssue(id);
    return result;
  }

  @Put("/reject/{id}")
  public async rejectToken(@Path('id') id: any) {
    let result = await TokenRepository.rejectTokenIssue(id);
    return result;
  }

  @Post("/purchase")
  public async createTokenPurchaseRequest(@BodyProp('token_id') token_id: any, @BodyProp('user_id') user_id: any, @BodyProp('amount') amount: any, @Request() req: any) {
    let result = await TokenRepository.createTokenPurchaseRequest(token_id, amount, req.user.id, user_id);
    return result;
  }

  @Put("/purchase/approve/{id}")
  public async approveTokenPurchaseRequest(@Path('id') id: number, @Request() req: any) {
    let result = await TokenRepository.approveTokenPurchaseRequest(id, req.user.id);
    return result;
  }

  @Get("/issued/{user_id}")
  public async getAllIssuedTokens(@Path('user_id') user_id: any) {
    let result = await TokenRepository.getAllIssuedTokens(user_id);
    return result;
  }

  @Get("/active")
  public async getAllActiveTokens() {
    let result = await TokenRepository.getActiveTokens();
    return result;
  }

  @Get("/allholders/{token_id}")
  public async getAllHoldersToken(@Path('token_id') token_id: any) {
    let result = await TokenRepository.getAllHoldersToken(token_id);
    return result;
  }

  @Get("/topholders/{token_name}")
  public async getTopHoldersToken(@Path('token_name') token_name: string) {
    let result = await TokenRepository.getTopHoldersToken(token_name);
    return result;
  }
}