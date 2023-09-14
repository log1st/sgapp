import { router } from "@/api/trpc";
import { list } from "./rooms/list";

export const rooms = router({
  list,
});
