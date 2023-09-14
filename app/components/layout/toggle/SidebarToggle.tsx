"use client";

import { UiSidebarToggle } from "@/ui/layouts/sidebar";
import { usePending } from "@/hooks";
import { setSessionSetting } from "@/session/sessionSetting";
import { SettingType } from "@/session/settingType";

export type SidebarToggleProps = {
  sidebar?: boolean;
};

export default function SidebarToggle({ sidebar }: SidebarToggleProps) {
  const { run } = usePending(() =>
    setSessionSetting(SettingType.sidebar, !sidebar),
  );
  return <UiSidebarToggle onClick={run} />;
}
