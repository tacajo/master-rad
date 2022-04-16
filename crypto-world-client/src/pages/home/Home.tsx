import { HomeStyle as style } from "./HomeStyle";
import { css } from "aphrodite/no-important";
import { Button, Col, Modal, Row } from "react-bootstrap";
import ReactStars from "react-stars";
import { ICourse } from "../../interfaces/course.interface";
import { useEffect, useState } from "react";
import { addToCart, downloadFile, getAllCourses, getCoursesFile } from "../../services/course.service";
import constants from "../../constants";
import fileDownload from "js-file-download";
import CourseDetail from "../../components/courseDetail/CourseDetail";
const FileSaver = require("file-saver");

export default function Home() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const url = `${constants.BASE_URL}/get-s3-file?fileKey=`;
  const downloadurl = `${constants.BASE_URL}/download?fileKey=`;
  const [show, setShow] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();

  const handleClose = () => setShow(false);
  const handleShow = async (course: any) => {
    await setSelectedCourse(course);
    setShow(true);
  };

  useEffect(() => {
    getCourses();
  }, []);

  async function getCourses() {
    const result = await getAllCourses();
    console.log(result);
    setCourses(result.data);
  }

  async function addCourseToCart(id: String) {
    await addToCart(id);
    getCourses();
  }

  async function download(course_id: String) {
    const result = await getCoursesFile(course_id);
    result.data.map(async (file: any) => {
      //let res = await downloadFile(file.file_name);
      //fileDownload(res.data, file.file_name);
      FileSaver.saveAs(`${downloadurl}${file.file_name}`, file.file_name);
    });
  }

  return (
    <div className="container">
      <div className={css(style.title)}>Let's start learning</div>
      <CourseDetail show={show} handleClose={handleClose} course={selectedCourse}></CourseDetail>
      <Row>
        {courses?.map((course: ICourse) => (
          <Col className="col-3">
            <div className={course.status == "1" ? css(style.myCard) : css(style.card)}>
              <img src={`${url}${course.cover}`} width="100%" height="170px" alt="course image"></img>
              {course.status == "1" && <div className={css(style.myCourseTicket)}>paid</div>}
              <h1 className={css(style.courseTitle)}>{course.title}</h1>
              {course.ticket && <span className={css(style.ticket)}>{course.ticket}</span>}
              <div className={css(style.stars)}>
                <span className={css(style.starsRating)}>{course.rating}</span>
                <ReactStars count={5} value={course.rating} size={24} color2={"#ffd700"} edit={false} />
              </div>
              <p className={css(style.price)}>${course.price}</p>
              <div className="d-flex justify-content-space-between">
                <button className={css(style.buttonSeeDetails)} onClick={() => handleShow(course)}>
                  See details
                </button>
                {course.status == "0" && (
                  <button className={css(style.button)} disabled>
                    Added to Cart
                  </button>
                )}
                {course.status != "0" && course.status != "1" && (
                  <button className={css(style.button)} onClick={() => addCourseToCart(course.course_id)}>
                    Add to Cart
                  </button>
                )}
                {course.status == "1" && (
                  <button className={css(style.downloadButton)} onClick={() => download(course.course_id)}>
                    Download files
                  </button>
                )}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
