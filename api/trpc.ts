import { initTRPC } from "@trpc/server";
import superJson from "superjson";
import { ApiContext } from "@/api/types/ApiContext";

const t = initTRPC.context<ApiContext>().create({ transformer: superJson });

export const { router, procedure: publicProcedure, middleware } = t;
