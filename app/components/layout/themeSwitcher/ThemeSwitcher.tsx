"use client";

import { AppTheme } from "@/ui/layouts/root";
import { switchTheme } from "@/app/api/layout/switchTheme";
import { Icon, UiIcon } from "@/ui/components/icon";
import { UiSidebarItem } from "@/ui/components/sidebar-item";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { usePending } from "@/hooks";

export type ThemeSwitcherProps = {
  theme?: AppTheme;
  lng?: string;
};

export default function ThemeSwitcher({ theme, lng }: ThemeSwitcherProps) {
  const { t } = useClientTranslation("sidebar", undefined, lng);

  const { pending, run } = usePending(switchTheme);

  return (
    <UiSidebarItem
      appendIcon={
        pending ? <UiIcon icon={Icon.spinner} spin size={16} /> : null
      }
      label={t("toggleTheme")}
      onClick={run}
      icon={theme === AppTheme.light ? Icon.sun : Icon.moon}
    />
  );
}
