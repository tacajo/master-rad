import { useEffect, useState } from "react";
import { css } from "aphrodite/no-important";
import { AddCourseStyle as style } from "./AddCourseStyle";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { getCoursesFile } from "../../services/course.service";
import constants from "../../constants";
import { IFile } from "../../interfaces/file.interface";
import { ICourse } from "../../interfaces/course.interface";
import { GlobalStyle } from "../../assets/style/GlobalStyle";
// import { S3Client, S3 } from "@aws-sdk/client-s3";
// import { Upload } from "@aws-sdk/lib-storage";

export default function AddCourse({ show, handleClose, course, paid }: any) {
  const [files, setFiles] = useState<IFile[]>([]);
  const url = `${constants.BASE_URL}/get-s3-file?fileKey=`;
  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState("");

  const [state, setState] = useState<ICourse>({
    course_id: "",
    rating: 5,
    status: "0",
    title: "",
    ticket: "",
    description: "",
    price: 0,
    cover: "",
    files: "",
  });

  useEffect(() => {
    getFiles();
  }, [course]);

  async function getFiles() {
    if (course?.course_id) {
      const result = await getCoursesFile(course.course_id);
      setFiles(result.data);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setState({
      ...state,
      [e.currentTarget.name]: value,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: ICourse = {
      course_id: state.course_id,
      title: state.title,
      ticket: state.ticket,
      rating: state.rating,
      description: state.description,
      price: state.price,
      status: state.status,
      cover: state.cover,
      files: state.files,
    };
    //const target = { Bucket: "tacajobucket", Key: file?.name, Body: file };
    try {
      // const parallelUploads3 = new Upload({
      //   client: new S3({
      //     region: "eu-central-1",
      //     credentials: {
      //       accessKeyId: "AKIAVRVO5GAZVDHIAL7P",
      //       secretAccessKey: "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",
      //     },
      //   }),
      //   leavePartsOnError: false, // optional manually handle dropped parts
      //   params: target,
      // });
      // parallelUploads3.on("httpUploadProgress", (progress) => {
      //   console.log(progress);
      // });
      // await parallelUploads3.done();
    } catch (e) {
      console.log(e);
    }
  }
  function validateForm() {
    return state.title.length > 0;
  }

  async function onChange(files: any) {
    setFile(files[0]);
  }

  return (
    <div>
      <Modal show={show} className={css(style.modalDesign)}>
        <Modal.Header>
          <Modal.Title className={css(style.title)}>Add new course </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <input
              className={css(GlobalStyle.input)}
              type="text"
              name="title"
              value={state.title}
              onChange={handleChange}
              required
              placeholder="title"
            />
            <input
              className={css(GlobalStyle.input)}
              type="text"
              name="description"
              value={state.description}
              onChange={handleChange}
              placeholder="description"
            />
            <input
              className={css(GlobalStyle.input)}
              type="text"
              name="ticket"
              value={state.ticket}
              onChange={handleChange}
              placeholder="ticket"
            />
            <input
              className={css(GlobalStyle.input)}
              type="number"
              name="price"
              value={state.price}
              onChange={handleChange}
              placeholder="price"
            />
            <input
              multiple
              type="file"
              onChange={(e) => {
                onChange(e.target.files);
              }}
            />

            <button className={css(GlobalStyle.button)} type="submit" disabled={!validateForm()}>
              Add
            </button>
          </form>
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
