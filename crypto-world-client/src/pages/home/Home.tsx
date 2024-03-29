import { HomeStyle as style } from "./HomeStyle";
import { css } from "aphrodite/no-important";
import { Col, Row } from "react-bootstrap";
import ReactStars from "react-stars";

import image from "../../assets/images/Free-Online-Course.jpg";
import { ICourse } from "../../interfaces/course.interface";
import { useEffect, useState } from "react";
import { getAllCourses } from "../../services/course.service";

export default function Home() {
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    async function getCourses() {
      const result = await getAllCourses();
      console.log(result);
      setCourses(result.data);
    }
    getCourses();
  }, []);

  return (
    <div className="container">
      <div className={css(style.title)}>Let's start learning</div>
      <Row>
        {courses?.map((course: ICourse) => (
          <Col className="col-3">
            <div className={css(style.card)}>
              <img src={image} width="100%" alt="course image"></img>
              <h1 className={css(style.courseTitle)}>{course.title}</h1>
              {course.ticket && <span className={css(style.ticket)}>{course.ticket}</span>}
              <div className={css(style.stars)}>
                <span className={css(style.starsRating)}>{course.rating}</span>
                <ReactStars count={5} value={course.rating} size={24} color2={"#ffd700"} edit={false} />
              </div>
              <p className={css(style.price)}>${course.price}</p>
              <button className={css(style.buttonSeeDetails)}>See details</button>
              <div className="d-flex justify-content-end">
                <button className={css(style.button)}>Add to Cart</button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
