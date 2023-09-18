import { accessTokenProcedure } from "../../services/auth/accessTokenProcedure";
import { usersListRequest } from "../../types/user/UsersListRequest";
import { omitUser } from "../../utils/omit/omitUser";

export const list = accessTokenProcedure
  .input(usersListRequest)
  .query(async ({ ctx: { db }, input }) => {
    const where: Required<Parameters<typeof db.user.findMany>>[0]["where"] = {
      login: {
        contains: input.filter.query,
        mode: "insensitive",
      },
    };

    const total = await db.user.count({ where });

    const data = await db.user.findMany({
      where,
      take: input.limit,
      skip: (input.page - 1) * input.limit,
    });

    return {
      data: data.map(omitUser),
      total,
      page: Math.max(input.page, Math.ceil(total / input.limit)),
      limit: input.limit,
    };
  });
