import { CSS_BREAKPOINTS } from "../variables";

export const MIN_WIDTH = (breakpoint: number): string => `@media screen and (min-width: ${breakpoint}px)`;
export const MAX_WIDTH = (breakpoint: number): string => `@media screen and (max-width: ${breakpoint}px)`;
export const BETWEEN_WIDTH = (from: number, to: number): string =>
  `@media screen and (min-width: ${from}px) and (max-width: ${to}px`;

export const MIN_WIDTH_MOBILE = `@media screen and (min-width: ${CSS_BREAKPOINTS.MOBILE}px)`;
export const MIN_WIDTH_LARGE_MOBILE = `@media screen and (min-width: ${CSS_BREAKPOINTS.LARGE_MOBILE}px)`;
export const MIN_WIDTH_TABLET = `@media screen and (min-width: ${CSS_BREAKPOINTS.TABLET}px)`;
export const MIN_WIDTH_LARGE_TABLET = `@media screen and (min-width: ${CSS_BREAKPOINTS.LARGE_MOBILE}px)`;
export const MIN_WIDTH_LAPTOP = `@media screen and (min-width: ${CSS_BREAKPOINTS.LAPTOP}px)`;
export const MIN_WIDTH_LARGE_LAPTOP = `@media screen and (min-width: ${CSS_BREAKPOINTS.LARGE_MOBILE}px)`;

export const MAX_WIDTH_MOBILE = `@media screen and (max-width: ${CSS_BREAKPOINTS.MOBILE}px)`;
export const MAX_WIDTH_LARGE_MOBILE = `@media screen and (max-width: ${CSS_BREAKPOINTS.LARGE_MOBILE}px)`;
export const MAX_WIDTH_TABLET = `@media screen and (max-width: ${CSS_BREAKPOINTS.TABLET}px)`;
export const MAX_WIDTH_LARGE_TABLET = `@media screen and (max-width: ${CSS_BREAKPOINTS.LARGE_MOBILE}px)`;
export const MAX_WIDTH_LAPTOP = `@media screen and (max-width: ${CSS_BREAKPOINTS.LAPTOP}px)`;
export const MAX_WIDTH_LARGE_LAPTOP = `@media screen and (max-width: ${CSS_BREAKPOINTS.LARGE_MOBILE}px)`;
