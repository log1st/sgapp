import { accessTokenProcedure } from "../../services/auth/accessTokenProcedure";
import { createJeopardyPackRequest } from "../../types/jeopardy/CreateJeopardyPackRequest";

export const createPack = accessTokenProcedure
  .input(createJeopardyPackRequest)
  .mutation(() => ({
    id: 1,
  }));
