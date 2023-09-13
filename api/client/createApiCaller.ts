import { db } from "@/api/db";
import { apiRouter } from "@/api/apiRouter";
import { ApiContext } from "@/api";

export const createApiCaller = (context?: Omit<ApiContext, "db">) =>
  apiRouter.createCaller({
    ...context,
    db,
  });
