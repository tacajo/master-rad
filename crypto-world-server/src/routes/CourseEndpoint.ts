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

router.get("/all", [JWTMiddleware.verifyToken], async (req: any, res: any) => {
  const controller = Container.get(CourseController);
  const response = await controller.getAllCourses(req);
  return res.status(response?.statusCode).send(response);
});

router.post(
  "/cart",
  [JWTMiddleware.verifyToken],
  async (req: any, res: any) => {
    const controller = Container.get(CourseController);
    const response = await controller.addCourseToCart(
      req.user.id,
      req.body.course_id
    );
    return res.status(response?.statusCode).send(response);
  }
);

router.get("/cart", [JWTMiddleware.verifyToken], async (req: any, res: any) => {
  const controller = Container.get(CourseController);
  const response = await controller.getCoursesFromCart(req);
  return res.status(response?.statusCode).send(response);
});

router.get("/my-courses", [JWTMiddleware.verifyToken], async (req: any, res: any) => {
  const controller = Container.get(CourseController);
  const response = await controller.getMyCourses(req);
  return res.status(response?.statusCode).send(response);
});

router.get("/course-files/:course_id", [JWTMiddleware.verifyToken], async (req: any, res: any) => {
  const controller = Container.get(CourseController);
  const response = await controller.getCourseFile(req.params.course_id);
  return res.status(response?.statusCode).send(response);
});
export default router;
