"use client";

import { UiSidebarItem, UiSidebarItemType } from "@/ui/components/sidebar-item";
import { Icon } from "@/ui/components/icon";
import { signOutAction } from "@/app/api/auth/signOutAction";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { usePending } from "@/hooks";

export type SignOutProps = {
  lng?: string;
};

export default function SignOut({ lng }: SignOutProps) {
  const { t } = useClientTranslation("sidebar", undefined, lng);

  const { run } = usePending(signOutAction);

  return (
    <UiSidebarItem
      type={UiSidebarItemType.danger}
      label={t("signOut")}
      icon={Icon.arrowRightOnRectangle}
      onClick={run}
    />
  );
}
