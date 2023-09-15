import { AppRouterInput, AppRouterOutput } from "@/api/apiRouter";

export type TotpSecretOutput = AppRouterOutput["settings"]["totpSecret"];
export type TotpSecretInput = AppRouterInput["settings"]["totpSecret"];
