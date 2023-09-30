import { router } from "../trpc";
import { pack } from "./jeopardy/pack";

export const jeopardy = router({
  pack,
});
