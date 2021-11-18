import { CSS_TRANSITION_EASE, CSS_TRANSITION_SPEED } from "../variables";

export const CSS_TRANSITION = (
  properties: string | string[],
  speed = CSS_TRANSITION_SPEED.NORMAL,
  ease = CSS_TRANSITION_EASE.LINEAR
): string => {
  if (Array.isArray(properties)) {
    return properties.map((property: string) => `${property} ${speed} ${ease}`).join(", ");
  }

  return `${properties} ${speed} ${ease}`;
};
