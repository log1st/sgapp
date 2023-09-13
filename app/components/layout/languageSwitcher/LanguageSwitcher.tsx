"use client";

import { UiSidebarItem } from "@/ui/components/sidebar-item";
import { switchLanguage } from "@/app/api/layout/switchLanguage";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { usePending } from "@/hooks";
import { Icon, UiIcon } from "@/ui/components/icon";

export type LanguageSwitcherProps = {
  lng?: string;
};

export default function LanguageSwitcher({ lng }: LanguageSwitcherProps) {
  const { t } = useClientTranslation("meta", undefined, lng);

  const { pending, run } = usePending(switchLanguage);

  return (
    <UiSidebarItem
      appendIcon={
        pending ? <UiIcon icon={Icon.spinner} spin size={16} /> : null
      }
      onClick={run}
      label={t("language")}
      icon={lng}
    />
  );
}
