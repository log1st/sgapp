import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { router } from "./trpc";
import { auth } from "./routes/auth";
import { rooms } from "./routes/rooms";
import { jeopardy } from "./routes/jeopardy";
import { settings } from "./routes/settings";

export const apiRouter = router({
  auth,
  rooms,
  jeopardy,
  settings,
});

export type ApiRouter = typeof apiRouter;

export type AppRouterInput = inferRouterInputs<ApiRouter>;
export type AppRouterOutput = inferRouterOutputs<ApiRouter>;
