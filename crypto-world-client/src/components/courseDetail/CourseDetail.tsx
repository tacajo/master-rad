import { useEffect, useState } from "react";
import { css } from "aphrodite/no-important";
import { CourseDetailStyle as style } from "./CourseDetailStyle";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { getCoursesFile } from "../../services/course.service";
import ReactStars from "react-stars";
import Watermark from "react-awesome-watermark";
import constants from "../../constants";
import { IFile } from "../../interfaces/file.interface";

export default function CourseDetail({ show, handleClose, course, paid }: any) {
  const [files, setFiles] = useState<IFile[]>([]);
  const url = `${constants.BASE_URL}/get-s3-file?fileKey=`;

  useEffect(() => {
    getFiles();
  }, [course]);

  async function getFiles() {
    if (course?.course_id) {
      const result = await getCoursesFile(course.course_id);
      setFiles(result.data);
    }
  }

  return (
    <div>
      <Modal show={show} className={css(style.modalDesign)}>
        <Modal.Header>
          <Modal.Title className={css(style.title)}>{course?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={css(style.description)}>
            <span>{course?.description}</span>
          </div>
          {course?.ticket && <span className={css(style.ticket)}>{course.ticket}</span>}
          <div className={css(style.stars)}>
            <span className={css(style.starsRating)}>{course?.rating}</span>
            <ReactStars count={5} value={course?.rating} size={24} color2={"#ffd700"} edit={false} />
          </div>
          <p className={css(style.price)}>${course?.price}</p>
          <span className={css(style.filesNum)}>Files ({files?.length})</span>
          <Row className={css(style.filesSection)}>
            {files?.map((file: IFile) => (
              <Col className="col-4">
                <div>
                  <Watermark
                    text="OnlineCourse"
                    style={
                      course.status == "1" || paid
                        ? {
                            width: 280,
                            height: 150,
                            opacity: 0,
                          }
                        : {
                            width: 280,
                            height: 150,
                            space: 120,
                            color: "#000",
                            fontSize: 18,
                          }
                    }
                    multiple
                  >
                    {file.file_name.split(".")[1] == "pdf" || file.file_name.split(".")[1] == "mp4" ? (
                      <iframe
                        src={`${url}${file.file_name}&fileSize=${file.file_size}`}
                        title={`${file.file_name}`}
                        allow={course.status == "1" ? "fullscreen" : ""}
                      ></iframe>
                    ) : (
                      <img src={`${url}${file.file_name}`} alt={`${file.file_name}`} width="290" height="150" />
                    )}
                  </Watermark>
                </div>
              </Col>
            ))}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
