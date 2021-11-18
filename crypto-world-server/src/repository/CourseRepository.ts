import { ResponseMessage } from "../model/response/ResponseMessage";
import { CourseQueryProcessor } from "../query_processor/CourseQueryProcessor";

export class CourseRepository {
  public static async addCourse(
    title: String,
    ticket: String,
    price: number,
    rating: number,
    description: String
  ) {
    try {
      let result = await CourseQueryProcessor.addCourse(
        title,
        ticket,
        price,
        rating,
        description
      );
      if (!result)
        return new ResponseMessage(
          "There was a problem adding the course.",
          "500",
          null
        );
      return new ResponseMessage("Success", "200", null);
    } catch (err) {
      console.log(err);
    }
  }

  public static async getAllCourses() {
    try {
      let result = await CourseQueryProcessor.getAllCourses();
      if (!result) return;
      return new ResponseMessage("", "200", result);
    } catch (err) {
      console.log(err);
    }
  }
}
