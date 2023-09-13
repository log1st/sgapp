import { initTRPC, TRPCError } from "@trpc/server";
import superJson from "superjson";
import { ApiContext } from "@/api/types/ApiContext";

const t = initTRPC.context<ApiContext>().create({ transformer: superJson });

export const { router, procedure: publicProcedure, middleware } = t;

export const protectedProcedure = publicProcedure.use(
  middleware(({ ctx, next }) => {
    if (!ctx.accessToken) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return next();
  }),
);
