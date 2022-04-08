import { css } from "aphrodite/no-important";
import { CartStyle as style } from "./CartStyle";
import { GlobalStyle } from "../../assets/style/GlobalStyle";
import { getCoursesFromCart, pay } from "../../services/course.service";
import { useEffect, useState } from "react";
import { ICourse } from "../../interfaces/course.interface";
import { Col, Row } from "react-bootstrap";
import image from "../../assets/images/Free-Online-Course.jpg";
import ReactStars from "react-stars";

export default function Cart() {
  const [courses, setCourses] = useState<ICourse[]>([]);

  async function onPay() {
    const result = await pay(courses);
    console.log(result);
  }
  async function getCourses() {
    const result = await getCoursesFromCart();
    setCourses(result.data);
  }
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="container">
      <div className={css(style.title)}>Shopping cart</div>
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
                {course.status == "0" && (
                  <button className={css(style.button)} disabled>
                    Added to Cart
                  </button>
                )}
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <div className="pb-4">
        <hr></hr>
        <span className={css(style.sum)}>
          ${courses.reduce((accum: number, currentValue: ICourse) => accum + currentValue.price, 0)}
        </span>
        <button className={css(GlobalStyle.payButton)} onClick={onPay}>
          Pay
        </button>
      </div>
    </div>
  );
}
