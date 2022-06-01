import { StyleSheet } from "aphrodite/no-important";
import { COLORS, FONT_WEIGHT } from "../../assets/style/variables";

export const CourseDetailStyle = StyleSheet.create({
  modalDesign: {},
  title: {
    color: COLORS.white,
  },
  ticket: {
    color: COLORS.darkBlue,
    fontSize: "14px",
    padding: "0 3px",
    textTransform: "uppercase",
    background: COLORS.green,
    fontWeight: 600,
    margin: "20px",
    borderRadius: "2px",
  },
  stars: {
    display: "flex",
    margin: "0 20px",
    alignItems: "center",
  },
  starsRating: {
    color: COLORS.white,
    marginRight: "10px",
    fontWeight: 600,
  },
  price: {
    color: COLORS.white,
    fontSize: "18px",
    padding: "0 20px",
    fontWeight: 500,
  },
  description: {
    display: "flex",
    margin: "0 20px 20px 20px",
    alignItems: "center",
    color: COLORS.lightGray,
    fontSize: "14px",
  },
  files: {
    color: COLORS.white,
    fontSize: "24px",
  },
  filesSection: {
    margin: "30px 10px 50px",
  },
  filesNum: {
    color: COLORS.lightGray,
    fontSize: "20px",
    padding: "0 20px",
    fontWeight: 500,
  },
  iframeDisableDiv: {
    pointerEvents: "none",
  },
  iframeDiv: {
    pointerEvents: "auto",
  },
});
