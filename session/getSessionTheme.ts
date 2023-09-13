import { cookies } from "next/headers";
import { AppTheme } from "@/app/ui/layouts/root";

const themeCookieName = "theme";

export const getSessionTheme = (): AppTheme =>
  (cookies().get(themeCookieName)?.value ?? AppTheme.light) as AppTheme;

export const setTheme = (theme: AppTheme) => {
  cookies().set(themeCookieName, theme);
};
