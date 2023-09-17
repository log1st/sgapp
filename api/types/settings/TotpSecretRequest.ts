import { AppRouterInput, AppRouterOutput } from "../../apiRouter";

export type TotpSecretOutput = AppRouterOutput["settings"]["totpSecret"];
export type TotpSecretInput = AppRouterInput["settings"]["totpSecret"];
