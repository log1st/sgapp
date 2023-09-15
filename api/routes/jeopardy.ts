import { router } from "../trpc";
import { packsList } from "./jeopardy/packsList";

export const jeopardy = router({
  packsList,
});
