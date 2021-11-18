const jwt = require('jsonwebtoken');
const config = require('../../config');
const constants = require('../constants/constants');

export class JWTMiddleware {
  static verifyToken(req: any, res: any, next: any) {
    var authHeader = req.headers.authorization;
    if(!authHeader) return res.status(403).send({ auth: false, message: 'No token provided.' });
    const token = authHeader.split(' ')[1];

    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });
      
    jwt.verify(token, constants.SECRET, (err: any, user: any) => {
      if(err) return res.sendStatus(403);
      req.user = user;
      next();
    })
  }
}