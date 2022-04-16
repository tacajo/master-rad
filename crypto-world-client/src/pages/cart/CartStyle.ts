import { StyleSheet } from "aphrodite/no-important";
import { COLORS, FONT_WEIGHT } from "../../assets/style/variables";

export const CartStyle = StyleSheet.create({
  title: {
    color: COLORS.darkBlue,
    fontSize: "45px",
    marginTop: "80px",
    marginBottom: "50px",
  },
  courseTitle: {
    color: COLORS.white,
    fontSize: "26px",
    padding: "20px",
  },
  courseProfileTitle: {
    color: COLORS.white,
    fontSize: "22px",
    padding: "20px",
  },
  card: {
    marginBottom: "40px",
    background: COLORS.lightGray,
    borderRadius: "4px",
    ":hover": {
      transform: "scale(1.05)",
    },
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
  price: {
    color: COLORS.white,
    fontSize: "18px",
    padding: "0 20px",
    fontWeight: 500,
  },
  stars: {
    display: "flex",
    margin: "0 20px",
    alignItems: "center",
  },
  starsRating: {
    color: COLORS.darkBlue,
    marginRight: "10px",
    fontWeight: 600,
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
  buttonSeeDetails: {
    margin: "0 15px 20px",
    background: "none",
    color: "inherit",
    border: "none",
    ":hover": {
      fontWeight: 600,
    },
  },
  sum: {
    color: COLORS.red,
    fontSize: "25px",
    marginTop: "80px",
    marginBottom: "50px",
  },
});
