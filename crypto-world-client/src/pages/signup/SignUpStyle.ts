import { StyleSheet } from "aphrodite/no-important";
import { COLORS, FONT_WEIGHT } from "../../assets/style/variables";

export const LoginStyle = StyleSheet.create({
  signUpWrapper: {
    height: "calc(100% - 80px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    alignContent: "center",
  },
  label: {
    color: COLORS.gray,
    fontWeight: FONT_WEIGHT.BOLD,
  },
  formBlockWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  formBlock: {
    width: "48%",
  },
});
