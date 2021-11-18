export class ResponseMessage {
  message: String = "";
  statusCode: any;
  data: any;

  constructor(message: any, statusCode: String, data: any) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}