import { BodyProp, Get, Path, Post, Put, Query, Route } from "tsoa";
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
  public async getAllCourses() {
    let result = await CourseRepository.getAllCourses();
    return result;
  }
}
