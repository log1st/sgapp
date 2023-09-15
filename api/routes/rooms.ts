import { router } from "../trpc";
import { list } from "./rooms/list";
import { create } from "./rooms/create";
import { get } from "./rooms/get";

export const rooms = router({
  list,
  create,
  get,
});
