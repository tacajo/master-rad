import { StyleSheet } from "aphrodite/no-important";
import { COLORS, FONT_WEIGHT } from "../../assets/style/variables";

export const SubsciptionStyle = StyleSheet.create({
  modalDesign: {},
  title: {
    color: COLORS.white,
  },
  description: {
    display: "flex",
    margin: "0 20px 20px 20px",
    alignItems: "center",
    color: COLORS.lightGray,
    fontSize: "14px",
  },
  planName: {
    color: COLORS.white,
    fontSize: "18px",
    fontWeight: FONT_WEIGHT.BOLD,
  },
  planDescription: {
    color: COLORS.white,
    fontSize: "14px",
    fontWeight: FONT_WEIGHT.LIGHT,
  },
});
