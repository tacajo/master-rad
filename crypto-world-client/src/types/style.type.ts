import { CSSProperties } from "aphrodite/no-important";

export type TStyleSheet<T> = Record<Extract<T, string>, CSSProperties>;

export type TFontWeight =
  | "normal"
  | "bold"
  | "bolder"
  | "lighter"
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;
