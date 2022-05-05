import express from "express";
import UserController from "../controllers/UserController";
import { JWTMiddleware } from "../middleware/VerifyToken";
import { CheckRole } from "../middleware/CheckRole";
import { Container } from "typescript-ioc";

const router = express.Router();

router.get("", JWTMiddleware.verifyToken, async (req: any, res) => {
  if (!req.user.id)
    return res.status(403).send({ auth: false, message: "No token provided." });
  const controller = Container.get(UserController);
  const response = await controller.getUser(req.user.id);
  return res.status(response?.statusCode).send(response);
});

router.get("/all", async (req, res) => {
  const controller = Container.get(UserController);
  const response = await controller.getAllUser();
  return res.status(response?.statusCode).send(response);
});

router.get("/:id", async (req, res) => {
  const controller = Container.get(UserController);
  const response = await controller.getUser(req.params.id);
  return res.status(response?.statusCode).send(response);
});

router.post("/register", async (req, res) => {
  const controller = Container.get(UserController);
  const response = await controller.registerUser(
    req.body.firstName,
    req.body.lastName,
    req.body.company,
    req.body.balance,
    req.body.birthday,
    req.body.titleInTheCompnay,
    req.body.email,
    req.body.password
  );
  return res.status(response?.statusCode).send(response);
});

router.post("/login", async (req, res) => {
  const controller = Container.get(UserController);
  const response = await controller.login(req.body.email, req.body.password);
  return res.status(response?.statusCode).send(response);
});

router.put(
  "/ban/:id",
  [JWTMiddleware.verifyToken, CheckRole.isAdmin],
  async (req: any, res: any) => {
    const controller = Container.get(UserController);
    const response = await controller.banUser(req.params.id);
    return res.status(response?.statusCode).send(response);
  }
);

router.post(
  "/paypal-subscription-complete",
  [JWTMiddleware.verifyToken],
  async (req: any, res: any) => {
    console.log("router subs")
    const controller = Container.get(UserController);
    const response = await controller.paypalSubscriptionComplete(req.body.orderId, req.body.subscriptionId, req);
    return res.status(response?.statusCode).send(response);
  }
);
export default router;
