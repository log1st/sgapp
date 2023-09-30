import { router } from "../../trpc";
import { create } from "./pack/create";
import { get } from "./pack/get";
import { list } from "./pack/list";

export const pack = router({
  create,
  get,
  list,
});
