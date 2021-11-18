import { PostgresDB } from "../config/PostgresDB";

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
}
