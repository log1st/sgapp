"use client";

import { ReactNode } from "react";
import { Route } from "next";
import { usePathname } from "next/navigation";
import { UiSidebarGroup } from "@/ui/layouts/sidebar";
import { UiSidebarItem } from "@/ui/components/sidebar-item";
import { Icon } from "@/ui/components/icon";
import { filteredArray, Keyed, routeMatching } from "@/utils";
import { useClientTranslation } from "@/i18n/useClientTranslation";

export type SidebarMainMenuProps = {
  lng?: string;
};

type Item = {
  label?: ReactNode;
  icon?: Icon;
  href?: Route;
  active?: boolean;
};

export default function SidebarMainMenu({ lng }: SidebarMainMenuProps) {
  const pathname = usePathname();
  const { t } = useClientTranslation(
    "sidebar",
    {
      keyPrefix: "menu",
    },
    lng,
  );

  const items = filteredArray<Keyed<Item>>([
    {
      key: "dashboard",
      label: t("dashboard"),
      href: "/",
      icon: Icon.squaresPlusSolid,
    },
    {
      key: "rooms",
      label: t("rooms"),
      href: "/rooms",
      icon: Icon.puzzle,
    },
    {
      key: "createRoom",
      label: t("createRoom"),
      href: "/rooms/create",
      icon: Icon.plus,
    },
  ]).map((item) => ({
    ...item,
    active: !!(
      item.href === pathname ||
      (item.href && routeMatching(item.href, pathname) === 2)
    ),
  }));

  return (
    <UiSidebarGroup>
      {items.map(({ key, ...item }) => (
        <UiSidebarItem key={key} {...item} />
      ))}
    </UiSidebarGroup>
  );
}
