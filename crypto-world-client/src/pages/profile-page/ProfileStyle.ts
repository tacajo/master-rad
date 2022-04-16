import { StyleSheet } from "aphrodite/no-important";
import { COLORS, FONT_WEIGHT } from "../../assets/style/variables";

export const ProfileStyle = StyleSheet.create({
  wrapper: {
    height: "calc(100% - 80px)",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
  link: {
    color: COLORS.white,
    ":hover": {
      color: COLORS.gray,
    },
  },
  message: {
    alignContent: "center",
  },
  leftPart: {
    background: COLORS.lightGray,
    padding: "40px",
    margin: "80px",
    borderRadius: "4px",
  },
  rightPart: {
    marginTop: "50px",
    padding: "40px",
    alignItems: "center",
    width: "60%",
    borderRadius: "4px",
  },
  nameWrapper: {
    width: "250px",
    height: "250px",
    lineHeight: "250px",
    borderRadius: "50%",
    fontSize: "100px",
    fontWeight: FONT_WEIGHT.BOLD,
    color: COLORS.white,
    textAlign: "center",
    background: COLORS.black,
  },
  text: {
    color: COLORS.black,
    textAlign: "center",
    height: "100%",
    width: "100%",
  },
  name: {
    color: COLORS.black,
    textAlign: "center",
    height: "100%",
    width: "100%",
    fontSize: "22px",
    fontWeight: FONT_WEIGHT.BOLD,
  },
  buttonSection: {
    marginTop: "80px",
    textAlign: "center",
    fontSize: "12px",
  },
  buttonMyCourses: {
    display: "block",
    border: "none",
    margin: "auto",
    background: COLORS.green,
    fontSize: "16px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    padding: "10px 20px",
    borderRadius: "5px",
  },
  title: {
    textAlign: "center",
    letterSpacing: "1px",
    marginBottom: "20px",
    fontSize: "28px",
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.BOLD,
    textTransform: "uppercase",
  },
  label: {
    color: COLORS.gray,
    textAlign: "center",
    height: "100%",
    width: "100%",
    fontSize: "14px",
  },
  field: {
    color: COLORS.black,
    textAlign: "center",
    height: "100%",
    width: "100%",
    fontSize: "26px",
  },
  allInfoButton: {
    display: "block",
    border: "none",
    background: "transparent",
    fontSize: "16px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    paddingTop: 20,
    borderRadius: "5px",
    ":hover": {
      fontWeight: FONT_WEIGHT.BOLD,
    },
  },
  allInfoWrapper: {
    marginRight: "50px",
  },
  activeTokenWrapper: {
    marginRight: "30px",
  },
  addTokenForm: {
    width: "100%",
  },
  table: {
    borderCollapse: "collapse",
    margin: "25px 0",
    fontSize: "18px",
    width: "100%",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
    color: COLORS.lightGray,
    padding: "10px",
  },
  tableHeader: {
    width: "100%",
    background: COLORS.white,
    color: COLORS.black,
    fontSize: "20px",
    textTransform: "uppercase",
  },
  tableFields: {
    padding: "10px",
    textAlign: "center",
  },
  button: {
    margin: "0 20px 20px",
    border: "none",
    background: COLORS.green,
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "0.1px",
    padding: "10px 20px",
    borderRadius: "5px",
    ":hover": {
      fontWeight: 600,
    },
  },
});
