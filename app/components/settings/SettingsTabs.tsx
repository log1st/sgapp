"use client";

import { usePathname } from "next/navigation";
import { UiProgressTabsGroup } from "@/ui/layouts/progress-tabs-group";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { filteredArray, Keyed, routeMatching } from "@/utils";
import { UiProgressTabProps } from "@/ui/components/progress-tab";

export type SettingsTabProps = {
  lng?: string;
};

export default function SettingsTabs({ lng }: SettingsTabProps) {
  const { t } = useClientTranslation("settings", undefined, lng);

  const pathname = usePathname();

  const tabs = filteredArray<Keyed<UiProgressTabProps>>([
    {
      key: "password",
      label: t("password.title"),
      href: "/settings/password",
    },
    {
      key: "2fa",
      label: t("2fa.title"),
      href: "/settings/2fa",
    },
    {
      key: "avatar",
      label: t("avatar.title"),
      href: "/settings/avatar",
    },
  ]).map((tab) => ({
    ...tab,
    selected: !!tab.href && routeMatching(pathname, tab.href) >= 2,
  }));

  return <UiProgressTabsGroup tabs={tabs} />;
}
