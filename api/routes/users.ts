import { router } from "../trpc";
import { list } from "./users/list";

export const users = router({
  list,
});
