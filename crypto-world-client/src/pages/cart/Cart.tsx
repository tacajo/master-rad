import { css } from "aphrodite/no-important";
import { CartStyle as style } from "./CartStyle";
import { GlobalStyle } from "../../assets/style/GlobalStyle";
import { HomeStyle } from "../home/HomeStyle";
import { getCoursesFromCart, pay } from "../../services/course.service";
import { useEffect, useState } from "react";
import { ICourse } from "../../interfaces/course.interface";
import { Col, Row } from "react-bootstrap";
import ReactStars from "react-stars";
import constants from "../../constants";
import CourseDetail from "../../components/courseDetail/CourseDetail";

export default function Cart() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const sum = courses.reduce((accum: number, currentValue: ICourse) => accum + currentValue.price, 0);
  const url = `${constants.BASE_URL}/get-s3-file?fileKey=`;
  const [show, setShow] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();

  useEffect(() => {
    getCourses();
  }, []);

  async function onPay() {
    const result = await pay(courses);
    console.log(result);
  }
  async function getCourses() {
    const result = await getCoursesFromCart();
    setCourses(result.data);
  }

  const handleClose = () => setShow(false);
  const handleShow = async (course: any) => {
    await setSelectedCourse(course);
    setShow(true);
  };

  return (
    <div className="container">
      <div className={css(style.title)}>Shopping cart</div>
      <CourseDetail show={show} handleClose={handleClose} course={selectedCourse}></CourseDetail>
      <input type="file" accept="image/*" />
      <Row>
        {courses?.map((course: ICourse) => (
          <Col className="col-3">
            <div className={css(style.card)}>
              <img src={`${url}${course.cover}`} width="100%" height="170px" alt="course image"></img>
              <h1 className={css(HomeStyle.courseTitle)}>{course.title}</h1>
              {course.ticket && <span className={css(style.ticket)}>{course.ticket}</span>}
              <div className={css(style.stars)}>
                <span className={css(style.starsRating)}>{course.rating}</span>
                <ReactStars count={5} value={course.rating} size={24} color2={"#ffd700"} edit={false} />
              </div>
              <p className={css(style.price)}>${course.price}</p>
              <button className={css(style.buttonSeeDetails)} onClick={() => handleShow(course)}>
                See details
              </button>
            </div>
          </Col>
        ))}
      </Row>
      {sum ? (
        <div className="pb-4">
          <hr></hr>
          <span className={css(style.sum)}>
            ${courses.reduce((accum: number, currentValue: ICourse) => accum + currentValue.price, 0)}
          </span>
          <button className={css(GlobalStyle.payButton)} onClick={onPay}>
            Pay
          </button>
        </div>
      ) : (
        <div>Your shopping cart is empty.</div>
      )}
    </div>
  );
}
