import { publicProcedure, router } from "@/api/trpc";

export const apiRouter = router({
  auth: router({
    signIn: publicProcedure.query(() => ({
      data: "yes",
    })),
  }),
});
