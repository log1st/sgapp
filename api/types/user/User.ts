import { omitUser } from "../../utils/omit/omitUser";

export type PublicUser = Omit<ReturnType<typeof omitUser>, "hasTotpSecret">;
