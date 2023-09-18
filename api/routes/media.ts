import { router } from "../trpc";
import { srcById } from "./media/srcById";
import { upload } from "./media/upload";

export const media = router({
  srcById,
  upload,
});
