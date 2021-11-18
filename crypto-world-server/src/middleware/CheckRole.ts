import RoleEnum from "../model/enums/RoleEnum";
import { ResponseMessage } from "../model/response/ResponseMessage";

export class CheckRole {
  static isAdmin(req: any, res: any, next: any) {
    if(req.user.role != RoleEnum.ADMIN) {
        return res.send(new ResponseMessage("Forbidden", "403", null));
    }
    next();
  }

  static isUser(req: any, res: any, next: any) {
    if(req.user.role != RoleEnum.USER) {
        return res.send(new ResponseMessage("Forbidden", "403", null));
    }
    next();
  }
}