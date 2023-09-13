import { randomNumber } from "..";

export const getMockImageUrl = (random: string | number = randomNumber()) =>
  `https://loremflickr.com/400/500?random=${random}`;
