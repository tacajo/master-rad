import { StyleSheet } from "aphrodite/no-important";
import { COLORS, FONT_FAMILY, FONT_WEIGHT } from "./variables";

export const GlobalStyle = StyleSheet.create({
  authWrapper: {
    margin: 0,
    padding: 0,
    fontFamily: FONT_FAMILY.PRIMARY,
    // backgroundImage: "url(../images/rm380-12.jpg)",
    // backgroundRepeat: "no-repeat",
    // backgroundAttachment: "fixed",
    height: "100vh",
  },
  formWrapper: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "10px 0",
    fontSize: "16px",
    letterSpacing: "1px",
    marginBottom: "18px",
    border: "none",
    borderBottom: `1px solid ${COLORS.white}`,
    outline: "none",
    backgroundColor: "transparent",
    color: "inherit",
    ":invalid": {
      backgroundColor: "transparent",
    },
  },
  title: {
    textAlign: "center",
    letterSpacing: "1px",
    marginBottom: "2px",
    fontSize: "30px",
    color: COLORS.green,
    fontWeight: FONT_WEIGHT.BOLD,
    textTransform: "uppercase",
  },
  form: {
    position: "relative",
    width: "100%",
    maxWidth: "380px",
    padding: "40px",
    background: COLORS.darkBlue,
    borderRadius: "10px",
    color: COLORS.white,
    boxShadow: `0 15px 35px ${COLORS.gray}`,
  },
  formLarge: {
    position: "relative",
    width: "100%",
    maxWidth: "580px",
    padding: "40px",
    background: COLORS.darkBlue,
    borderRadius: "10px",
    color: COLORS.white,
    boxShadow: `0 15px 25px ${COLORS.black}`,
  },
  link: {
    color: COLORS.white,
    ":hover": {
      color: COLORS.gray,
    },
  },
  button: {
    display: "block",
    marginLeft: "auto",
    border: "none",
    background: COLORS.green,
    fontSize: "16px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    padding: "10px 20px",
    borderRadius: "5px",
  },
  message: {
    alignContent: "center",
  },
});
