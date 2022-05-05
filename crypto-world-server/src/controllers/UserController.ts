import { BodyProp, Get, Path, Post, Put, Query, Route, Request } from "tsoa";
import { UserRepository } from "../repository/UserRepository";

@Route("user")
export default class UserController {
  @Get("/{id}")
  public async getUser(@Path() id: any) {
    let result = await UserRepository.getUser(id);
    return result;
  }

  @Get("/all")
  public async getAllUser() {
    let result = await UserRepository.getAllUser();
    return result;
  }

  @Post("/register")
  public async registerUser(
    @BodyProp("firstName") firstName: String,
    @BodyProp("lastName") lastName: String,
    @BodyProp("company") company: String,
    @BodyProp("balance") balance: number,
    @BodyProp("birthday") birthday: any,
    @BodyProp("titleInTheCompnay") titleInTheCompnay: String,
    @BodyProp("email") email: String,
    @BodyProp("password") password: String
  ) {
    let result = await UserRepository.registerUser(
      firstName,
      lastName,
      company,
      balance,
      birthday,
      titleInTheCompnay,
      email,
      password
    );
    return result;
  }

  @Post("/login")
  public async login(
    @BodyProp("email") email: String,
    @BodyProp("password") password: String
  ) {
    let result = await UserRepository.login(email, password);
    return result;
  }

  @Put("/ban/{id}")
  public async banUser(@Path() id: any) {
    let result = await UserRepository.banUser(id);
    return result;
  }

  @Post("/paypal-subscription-complete")
  public async paypalSubscriptionComplete( @BodyProp("orderId") orderId: string,
  @BodyProp("subscriptionId") subscriptionId: string, @Request() req: any) {
    console.log("controller subs")
    let result = await UserRepository.subscriptionComplete(req.user.id, subscriptionId, orderId);
    return result;
  }
}
