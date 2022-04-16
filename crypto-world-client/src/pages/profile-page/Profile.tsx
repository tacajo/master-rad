import { css } from "aphrodite/no-important";
import { useEffect, useState } from "react";
import { getUser } from "../../services/user.service";
import { ProfileStyle as style } from "./ProfileStyle";
import { HomeStyle } from "../home/HomeStyle";
import userMapping from "../../utils/user";
import { IUser } from "../../interfaces/user.interface";
import { ICourse } from "../../interfaces/course.interface";
import ReactStars from "react-stars";
import { Col, Row } from "react-bootstrap";
import { getMyCourses, getCoursesFile, downloadFile } from "../../services/course.service";
import fileDownload from "js-file-download";
import constants from "../../constants";
import CourseDetail from "../../components/courseDetail/CourseDetail";

export default function Profile() {
  const [user, setUser] = useState<IUser>({
    email: "",
    firstName: "",
    lastName: "",
    birthday: "",
    company: "",
    titleInTheCompany: "",
    balance: 0,
  });
  const [courses, setCourses] = useState<ICourse[]>([]);
  const url = `${constants.BASE_URL}/get-s3-file?fileKey=`;
  const [show, setShow] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();

  useEffect(() => {
    async function getLoggedInUser() {
      const result = await getUser();
      setUser(userMapping(result.data));
      getAllMyCourses();
    }
    getLoggedInUser();
  }, []);

  async function getAllMyCourses() {
    const result = await getMyCourses();
    setCourses(result.data);
    console.log(result);
  }

  async function download(course_id: String) {
    const result = await getCoursesFile(course_id);
    result.data.map(async (file: any) => {
      let res = await downloadFile(file.file_name);
      fileDownload(res.data, file.file_name);
    });
  }

  const handleClose = () => setShow(false);
  const handleShow = async (course: any) => {
    await setSelectedCourse(course);
    setShow(true);
  };

  return (
    <div className={css(style.wrapper)}>
      <div className={css(style.leftPart)}>
        <div className="text-center text">
          <div className={css(style.nameWrapper)}>
            <p>
              {user?.firstName[0]}
              {user?.lastName[0]}
            </p>
          </div>
          <div>
            <div className={css(style.name)}>
              {user?.firstName} {user?.lastName}
            </div>
            <div className={css(style.text)}>{user?.email}</div>
          </div>
          {/* <div>
            <button className={css(style.allInfoButton)} onClick={showInfo}>
              {t("profile.buttons.showInfo")}
            </button>
          </div>
          <div className="text-center">
            <button className={css(style.allInfoButton)} onClick={showTokens}>
              {t("profile.buttons.showTokens")}
            </button>
          </div> */}
          <div className={css(style.buttonSection)}>
            <button className={css(style.buttonMyCourses)}>My courses</button>
          </div>
        </div>
      </div>

      <div className={css(style.rightPart)}>
        <div className={css(style.title)}>My Courses</div>
        <CourseDetail show={show} handleClose={handleClose} course={selectedCourse} paid={true}></CourseDetail>
        {courses.length > 0 ? (
          <Row>
            {courses?.map((course: ICourse) => (
              <Col className="col-5 justify-content-space-between">
                <div className={course.status == "1" ? css(HomeStyle.myCard) : css(HomeStyle.card)}>
                  <img src={`${url}${course.cover}`} width="100%" height="170px" alt="course image"></img>
                  {course.status == "1" && <div className={css(HomeStyle.myCourseTicket)}>paid</div>}
                  <h1 className={css(HomeStyle.courseTitle)}>{course.title}</h1>
                  {course.ticket && <span className={css(HomeStyle.ticket)}>{course.ticket}</span>}
                  <div className={css(HomeStyle.stars)}>
                    <span className={css(HomeStyle.starsRating)}>{course.rating}</span>
                    <ReactStars count={5} value={course.rating} size={24} color2={"#ffd700"} edit={false} />
                  </div>
                  <p className={css(HomeStyle.price)}>${course.price}</p>
                  <div className="d-flex justify-content-space-between">
                    <button className={css(HomeStyle.buttonSeeDetails)} onClick={() => handleShow(course)}>
                      See details
                    </button>
                    <button className={css(HomeStyle.downloadButton)} onClick={() => download(course.course_id)}>
                      Download files
                    </button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <div>You do not have any courses yet.</div>
        )}
      </div>
    </div>
  );
}
