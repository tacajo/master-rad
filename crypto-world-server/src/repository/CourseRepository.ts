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

  public static async getAllCourses(user_id: String) {
    try {
      let result = await CourseQueryProcessor.getAllCourses();
      if (!result) return;
      let userCourses = await CourseQueryProcessor.getAllUsersCourses(user_id);
      if (!userCourses) return;
      result = result.map(
        (res: {
          course_id: string;
          title: string;
          ticket: string;
          rating: number;
          description: string;
          price: number;
          status: string;
          cover: string;
        }) => {
          let course = userCourses.find(
            (course: { course_id: string; status: string }) =>
              course.course_id == res.course_id
          );
          if (course)
            return {
              course_id: res.course_id,
              title: res.title,
              ticket: res.ticket,
              rating: res.rating,
              description: res.description,
              price: res.price,
              status: course.status,
              cover: res.cover,
            };
          return res;
        }
      );
      return new ResponseMessage("", "200", result);
    } catch (err) {
      console.log(err);
    }
  }

  public static async addCourseToCart(user_id: String, course_id: String) {
    try {
      let result = await CourseQueryProcessor.addCourseToCart(
        user_id,
        course_id
      );
      if (!result)
        return new ResponseMessage(
          "There was a problem adding the course to cart.",
          "500",
          null
        );
      return new ResponseMessage("Success", "200", null);
    } catch (err) {
      console.log(err);
    }
  }

  public static async getCoursesFromCart(user_id: String) {
    try {
      let result = await CourseQueryProcessor.getCoursesFromCart(user_id);
      if (!result)
        return new ResponseMessage(
          "There was a problem getting courses from cart.",
          "500",
          null
        );
      const courses = await Promise.all(
        result.map(async (user_course: any) => {
          return await this.getCourse(user_course.course_id);
        })
      );
      return new ResponseMessage("Success", "200", courses);
    } catch (err) {
      console.log(err);
    }
  }

  public static async getCourse(course_id: String) {
    try {
      let result = await CourseQueryProcessor.getCourse(course_id);
      if (result) return result[0];
      return null;
    } catch (err) {
      console.log(err);
    }
  }

  public static async getMyCourses(user_id: String) {
    try {
      let courses = await CourseQueryProcessor.getAllCourses();
      if (!courses) return;
      let userCourses = await CourseQueryProcessor.getPaidCourses(user_id);
      let result = userCourses.map(
        (res: {
          course_id: string;
          title: string;
          ticket: string;
          rating: number;
          description: string;
          price: number;
          status: string;
          cover: string;
        }) => {
          let course = courses.find(
            (course: { course_id: string; status: string }) =>
              course.course_id == res.course_id
          );
          console.log({course})
          if (course)
            return {
              course_id: course.course_id,
              title: course.title,
              ticket: course.ticket,
              rating: course.rating,
              description: course.description,
              price: course.price,
              status: course.status,
              cover: course.cover,
            };
          return res;
        }
      );

      if (!result)
        return new ResponseMessage(
          "There was a problem getting courses.",
          "500",
          null
        );
      return new ResponseMessage("Success", "200", result);
    } catch (err) {
      console.log(err);
    }
  }
  public static async getCourseFiles(course_id: String) {
    try {
      let result = await CourseQueryProcessor.getFilesName(course_id);
      if (!result)
      return new ResponseMessage(
        "There was a problem getting courses files.",
        "500",
        null
      );
    return new ResponseMessage("Success", "200", result);
    } catch (err) {
      console.log(err);
    }
  }
}
