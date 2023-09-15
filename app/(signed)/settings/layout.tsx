import { PropsWithChildren } from "react";
import { UiSettingsPageLayout } from "@/ui/layouts/settings-page-layout";
import { fetchProfileAction } from "@/app/api/auth/fetchProfileAction";
import { appRedirect } from "@/utils";
import SettingsTabs from "@/app/components/settings/SettingsTabs";
import { UiDialog } from "@/ui/components/dialog";

export type SettingsLayoutProps = PropsWithChildren;

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const profile = await fetchProfileAction();

  if (!profile.success) {
    appRedirect("/");
    return null;
  }

  return (
    <UiSettingsPageLayout>
      <UiDialog extended header={<SettingsTabs />}>
        {children}
      </UiDialog>
    </UiSettingsPageLayout>
  );
}
