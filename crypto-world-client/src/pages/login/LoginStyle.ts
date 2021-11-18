import { StyleSheet } from "aphrodite/no-important";
import { COLORS } from "../../assets/style/variables";

export const LoginStyle = StyleSheet.create({
  loginWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100% - 80px)",
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
});
