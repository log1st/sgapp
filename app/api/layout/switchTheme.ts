"use server";

import { getSessionTheme, setTheme } from "@/session/getSessionTheme";
import { AppTheme } from "@/ui/layouts/root";

export const switchTheme = async () => {
  setTheme(
    getSessionTheme() === AppTheme.light ? AppTheme.dark : AppTheme.light,
  );
};
