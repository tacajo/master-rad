import express from "express";
import CourseController from "../controllers/CourseController";
import { JWTMiddleware } from "../middleware/VerifyToken";
import { CheckRole } from "../middleware/CheckRole";
import { Container } from "typescript-ioc";

const router = express.Router();

router.post("", async (req, res) => {
  const controller = Container.get(CourseController);
  const response = await controller.addCourse(
    req.body.title,
    req.body.ticket,
    req.body.price,
    req.body.rating,
    req.body.description
  );
  return res.status(response?.statusCode).send(response);
});

router.get("/all", async (req, res) => {
  const controller = Container.get(CourseController);
  const response = await controller.getAllCourses();
  return res.status(response?.statusCode).send(response);
});

export default router;
