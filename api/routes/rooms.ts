import { router } from "@/api/trpc";
import { list } from "./rooms/list";
import { create } from "./rooms/create";

export const rooms = router({
  list,
  create,
});
