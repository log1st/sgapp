import { router } from "../trpc";
import { createPack } from "./jeopardy/createPack";
import { packsList } from "./jeopardy/packsList";

export const jeopardy = router({
  packsList,
  createPack,
});
