import { StyleSheet } from "aphrodite/no-important";
import { COLORS, FONT_WEIGHT, SPECIAL_COLORS, TYPOGRAPHY_COLORS } from "./variables";
import { CSS_TRANSITION, MAX_WIDTH_LARGE_MOBILE } from "./mixins";

export const typographyStyle = StyleSheet.create({
  title: {
    marginBottom: 15,
    fontSize: 34,
    fontWeight: FONT_WEIGHT.BOLD,
    lineHeight: 1.33,
    color: TYPOGRAPHY_COLORS.title,

    [MAX_WIDTH_LARGE_MOBILE]: {
      fontSize: 26,
      color: SPECIAL_COLORS.brand,
    },
  },

  text: {
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 1.5,
    color: TYPOGRAPHY_COLORS.text,
  },

  link: {
    fontSize: 16,
    lineHeight: 1.5,
    color: TYPOGRAPHY_COLORS.link,
    transition: CSS_TRANSITION("color"),

    ":hover": {
      color: COLORS.green,
    },
  },
});
