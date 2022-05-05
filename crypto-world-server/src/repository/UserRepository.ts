import { UserQueryProcessor } from "../query_processor/UserQueryProcessor";
import { ResponseMessage } from "../model/response/ResponseMessage";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../../config");

export class UserRepository {
  public static async getUser(id: Number) {
    try {
      let result = await UserQueryProcessor.getUser(id);
      if (!result)
        return new ResponseMessage("User is not found.", "400", null);
      return new ResponseMessage("", "200", result);
    } catch (err) {
      console.log(err);
    }
  }

  public static async getAllUser() {
    try {
      let result = await UserQueryProcessor.getAllUsers();
      if (!result) return;
      return new ResponseMessage("", "200", result);
    } catch (err) {
      console.log(err);
    }
  }

  public static async registerUser(
    firstName: String,
    lastName: String,
    company: String,
    balance: Number,
    birthday: any,
    titleInTheCompnay: String,
    email: String,
    password: String
  ) {
    try {
      const user = await UserQueryProcessor.getUserByEmail(email);
      if (user)
        return new ResponseMessage(
          "User with this email already exists",
          "400",
          null
        );

      var hashedPassword = bcrypt.hashSync(password, 8);

      let result = await UserQueryProcessor.registerUser(
        firstName,
        lastName,
        company,
        balance,
        birthday,
        titleInTheCompnay,
        email,
        hashedPassword
      );
      if (!result)
        return new ResponseMessage(
          "There was a problem registering the user.",
          "500",
          null
        );
      return new ResponseMessage("Success", "200", null);
    } catch (err) {
      console.log(err);
    }
  }

  public static async login(email: String, password: String) {
    try {
      var user = await UserQueryProcessor.getUserByEmail(email);
      if (!user)
        return new ResponseMessage(
          "User with this email does not exist",
          "400",
          null
        );
      if (user.banned)
        return new ResponseMessage("Your account is banned.", "400", null);

      var passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid)
        return new ResponseMessage("Password is not valid.", "401", {
          auth: false,
          token: null,
        });

      var token = jwt.sign(
        { id: user.user_id, role: user.role, email: user.email },
        config.secret,
        {
          expiresIn: 86400, // expires in 24 hours
        }
      );
      if (!token)
        return new ResponseMessage("Unauthorized.", "401", {
          auth: false,
          token: null,
        });

      return new ResponseMessage("Success", "200", {
        auth: true,
        token: token,
      });
    } catch (err) {
      console.log(err);
    }
  }

  public static async banUser(id: number) {
    try {
      var user = await UserQueryProcessor.getUser(id);
      if (!user)
        return new ResponseMessage(
          `User with id ${id} does not exist`,
          "400",
          null
        );

      let result = await UserQueryProcessor.banUser(id);
      if (!result)
        return new ResponseMessage("Error on the server.", "500", null);
      return new ResponseMessage("Success", "200", null);
    } catch (err) {
      console.log(err);
    }
  }

  public static async subscriptionComplete(
    user_id: number,
    subscription_id: string,
    order_id: string
  ) {
    try {
      console.log("repository subs")
      let result = await UserQueryProcessor.addSubscription(
        user_id,
        subscription_id,
        order_id
      );
      console.log("result from query processor subs")
      if (!result) return;
      return new ResponseMessage("", "200", result);
    } catch (err) {
      console.log(err);
    }
  }
}
