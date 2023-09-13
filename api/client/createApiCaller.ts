import { apiRouter } from "@/api/apiRouter";
import { db } from "@/api/db";
import { ApiContext } from "@/api/types/ApiContext";

export const createApiCaller = (context?: Omit<ApiContext, "db">) =>
  apiRouter.createCaller({
    ...context,
    db,
  });
