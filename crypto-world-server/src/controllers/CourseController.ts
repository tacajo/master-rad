import { BodyProp, Get, Post, Route, Request, Path } from "tsoa";
import { CourseRepository } from "../repository/CourseRepository";
import { UserRepository } from "../repository/UserRepository";

@Route("course")
export default class CourseController {
  @Post("")
  public async addCourse(
    @BodyProp("title") title: String,
    @BodyProp("ticket") ticket: String,
    @BodyProp("price") price: number,
    @BodyProp("rating") rating: number,
    @BodyProp("description") description: String
  ) {
    let result = await CourseRepository.addCourse(
      title,
      ticket,
      price,
      rating,
      description
    );
    return result;
  }

  @Get("/all")
  public async getAllCourses(@Request() req: any) {
    let result = await CourseRepository.getAllCourses(req.user.id);
    return result;
  }

  @Post("/cart")
  public async addCourseToCart(
    @BodyProp("user_id") user_id: String,
    @BodyProp("course_id") course_id: String
  ) {
    let result = await CourseRepository.addCourseToCart(user_id, course_id);
    return result;
  }

  @Get("/cart")
  public async getCoursesFromCart(@Request() req: any) {
    let result = await CourseRepository.getCoursesFromCart(req.user.id);
    return result;
  }

  @Get("/my-courses")
  public async getMyCourses(@Request() req: any) {
    let result = await CourseRepository.getMyCourses(req.user.id);
    return result;
  }

  @Get("/course-file/{course_id}")
  public async getCourseFile(@Path('course_id') course_id: string) {
    let result = await CourseRepository.getCourseFiles(course_id);
    return result;
  }
}
