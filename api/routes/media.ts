import { router } from "../trpc";
import { get } from "./media/get";
import { upload } from "./media/upload";

export const media = router({
  get,
  upload,
});
