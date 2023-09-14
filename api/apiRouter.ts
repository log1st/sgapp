import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { router } from "@/api/trpc";
import { auth } from "@/api/routes/auth";
import { rooms } from "@/api/routes/rooms";

export const apiRouter = router({
  auth,
  rooms,
});

export type ApiRouter = typeof apiRouter;

export type AppRouterInput = inferRouterInputs<ApiRouter>;
export type AppRouterOutput = inferRouterOutputs<ApiRouter>;
