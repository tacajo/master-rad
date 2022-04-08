import { PostgresDB } from "../config/PostgresDB";
import CartEnum from "../model/enums/CartStatus";

export class CourseQueryProcessor {
  public static async addCourse(
    title: String,
    ticket: String,
    price: number,
    rating: number,
    description: String
  ) {
    let query =
      "INSERT INTO public.course (title, ticket,  rating, description, price) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    let result = await PostgresDB.client.query(query, [
      title,
      ticket,
      rating,
      description,
      price,
    ]);
    return result.rows;
  }

  public static async getAllCourses() {
    let query = "SELECT * FROM public.course";
    let result = await PostgresDB.client.query(query, []);
    return result.rows;
  }

  public static async getAllUsersCourses(user_id: String) {
    let query = "SELECT * FROM public.user_course WHERE user_id = $1";
    let result = await PostgresDB.client.query(query, [user_id]);
    return result.rows;
  }

  public static async addCourseToCart(user_id: String, course_id: String) {
    let query =
      "INSERT INTO public.user_course (user_id, course_id, status) VALUES ($1, $2, $3) RETURNING *";
    let result = await PostgresDB.client.query(query, [
      user_id,
      course_id,
      CartEnum.PENDING,
    ]);
    return result.rows;
  }
  public static async getCoursesFromCart(user_id: String) {
    console.log(user_id);
    let query =
      "SELECT * FROM public.user_course WHERE user_id = $1 and status = $2";
    let result = await PostgresDB.client.query(query, [
      user_id,
      CartEnum.PENDING,
    ]);
    return result.rows;
  }

  public static async getCourse(course_id: String) {
    let query = "SELECT * FROM public.course WHERE course_id = $1";
    let result = await PostgresDB.client.query(query, [course_id]);
    return result.rows;
  }

  public static async updateItemTransaction(user_id: String, course_id: String) {
    console.log(user_id);
    let query =
      "UPDATE public.user_course SET status = $1 WHERE user_id = $2 and course_id = $3";
    let result = await PostgresDB.client.query(query, [
      CartEnum.PAID,
      user_id,
      course_id,
    ]);
    return result.rows;
  }
}
