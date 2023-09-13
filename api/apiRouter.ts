import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { router } from "@/api/trpc";
import { auth } from "@/api/routes/auth";

export const apiRouter = router({
  auth,
});

export type ApiRouter = typeof apiRouter;

export type AppRouterInput = inferRouterInputs<ApiRouter>;
export type AppRouterOutput = inferRouterOutputs<ApiRouter>;
