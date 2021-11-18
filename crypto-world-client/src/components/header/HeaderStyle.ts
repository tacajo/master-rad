import { StyleSheet } from "aphrodite/no-important";
import { COLORS, FONT_WEIGHT } from "../../assets/style/variables";

export const HeaderStyle = StyleSheet.create({
  logo: {
    fontWeight: FONT_WEIGHT.BOLD,
    color: COLORS.white,
    marginRight: "40px",
  },
  icon: {
    maxWidth: "40px",
    ":hover ": {
      cursor: "pointer",
      filter: `drop-shadow(7px 7px 7px ${COLORS.darkGray})`,
    },
  },
  headerContainer: {
    padding: "15px",
    background: COLORS.darkBlue,
    overflow: "hidden",
    backgroundColor: COLORS.darkBlue,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "80px",
  },
  navigation: {},
  dropdown: {
    marginLeft: "60px",
  },
  item: {
    color: COLORS.gray,
    padding: "14px 16px",
    textDecoration: "none",
    fontSize: "17px",
    ":hover": {
      color: COLORS.white,
    },
  },
  headerContainerBlock: {
    display: "flex",
    alignItems: "center",
  },
  dropdownShow: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "80px",
    right: 0,
    border: "5px",
    borderColor: COLORS.lightGray,
  },
  hideItem: {
    display: "none",
  },
  dropdownLink: {
    padding: "10px",
    width: "100px",
    translationDuration: "0.5s",
    color: COLORS.green,
    background: COLORS.darkBlue,
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
    ":hover": {
      color: COLORS.gray,
    },
  },
  balance: {
    color: COLORS.green,
  },
  button: {
    background: "transparent",
    boxShadow: "0 0 0 transparent",
    border: "0 solid transparent",
    textShadow: "0 0 0 transparent",
  },
  logoutButton: {
    borderRadius: "0 0 0 10px",
    padding: "10px",
    width: "100px",
    translationDuration: "0.5s",
    color: COLORS.green,
    background: COLORS.darkBlue,
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
    ":hover": {
      color: COLORS.gray,
    },
  },
});
