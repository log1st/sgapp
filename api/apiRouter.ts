import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { router } from "./trpc";
import { auth } from "./routes/auth";
import { rooms } from "./routes/rooms";
import { jeopardy } from "./routes/jeopardy";
import { settings } from "./routes/settings";
import { media } from "./routes/media";

export const apiRouter = router({
  auth,
  rooms,
  jeopardy,
  settings,
  media,
});

export type ApiRouter = typeof apiRouter;

export type AppRouterInput = inferRouterInputs<ApiRouter>;
export type AppRouterOutput = inferRouterOutputs<ApiRouter>;
