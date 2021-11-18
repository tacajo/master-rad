import express from "express";
import TokenController from "../controllers/TokenController";
import { JWTMiddleware } from "../middleware/VerifyToken"
import { Container } from "typescript-ioc";
import { CheckRole } from "../middleware/CheckRole"

const router = express.Router();

router.post("", [ JWTMiddleware.verifyToken, CheckRole.isUser ], async (req: any, res: any) => {
    const controller = Container.get(TokenController);
    const response = await controller.createToken(req.body.name, req.body.price, req.body.ico, req);
    return res.status(response?.statusCode).send(response);
});

router.put("/approve/:id", [ JWTMiddleware.verifyToken, CheckRole.isAdmin ], async (req: any, res: any) => {
    const controller = Container.get(TokenController);
    const response = await controller.approveToken(req.params.id);
    return res.status(response?.statusCode).send(response);
});

router.put("/reject/:id", [ JWTMiddleware.verifyToken, CheckRole.isAdmin ], async (req: any, res: any) => {
    const controller = Container.get(TokenController);
    const response = await controller.rejectToken(req.params.id);
    return res.status(response?.statusCode).send(response);
});

router.post("/purchase", [ JWTMiddleware.verifyToken, CheckRole.isUser ], async (req: any, res: any) => {
    const controller = Container.get(TokenController);
    const response = await controller.createTokenPurchaseRequest(req.body.token_id, req.body.user_id, req.body.amount, req);
    return res.status(response?.statusCode).send(response);
});

router.put("/purchase/approve/:id", [ JWTMiddleware.verifyToken, CheckRole.isUser ], async (req: any, res: any) => {
    const controller = Container.get(TokenController);
    const response = await controller.approveTokenPurchaseRequest(req.params.id, req);
    return res.status(response?.statusCode).send(response);
});

router.get("/issued/:user_id", JWTMiddleware.verifyToken, async (req: any, res) => {
    const controller = Container.get(TokenController);
    const response = await controller.getAllIssuedTokens(req.params.user_id);
    if(req.params.user_id != req.user.user_id) return res.status(403).send({ auth: false, message: 'No token provided.' });
    return res.status(response?.statusCode).send(response);
});

router.get("/active", async (req, res) => {
    const controller = Container.get(TokenController);
    const response = await controller.getAllActiveTokens();
    return res.status(response?.statusCode).send(response);
});

router.get("/allholders/:token_id", JWTMiddleware.verifyToken, async (req, res) => {
    const controller = Container.get(TokenController);
    const response = await controller.getAllHoldersToken(req.params.token_id)
    return res.status(response?.statusCode).send(response);
});

router.get("/topholders/:token_name", async (req, res) => {
    const controller = Container.get(TokenController);
    const response = await controller.getTopHoldersToken(req.params.token_name)
    return res.status(response?.statusCode).send(response);
});

export default router;
