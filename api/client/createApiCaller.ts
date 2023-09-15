import { db } from "../db";
import { apiRouter } from "../apiRouter";
import { ApiContext } from "../types/ApiContext";

export const createApiCaller = (context?: Omit<ApiContext, "db">) =>
  apiRouter.createCaller({
    ...context,
    db,
  });
