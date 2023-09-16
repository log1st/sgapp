"use client";

import { ReactNode } from "react";
import { Route } from "next";
import { usePathname } from "next/navigation";
import { UiSidebarGroup } from "@/ui/layouts/sidebar";
import { UiSidebarItem } from "@/ui/components/sidebar-item";
import { Icon } from "@/ui/components/icon";
import { filteredArray, Keyed, routeMatching } from "@/utils";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { UiSidebarLabel } from "@/ui/components/sidebar-label";

export type SidebarMainMenuProps = {
  lng?: string;
};

type Item = {
  label?: ReactNode;
  icon?: Icon;
  href?: Route;
  active?: boolean;
  level?: number;
};

export default function SidebarMainMenu({ lng }: SidebarMainMenuProps) {
  const pathname = usePathname();
  const { t } = useClientTranslation(["sidebar", "rooms"], undefined, lng);

  const items = filteredArray<Keyed<Item>>([
    {
      key: "dashboard",
      label: t("menu.dashboard"),
      href: "/",
      icon: Icon.squaresPlusSolid,
    },
    {
      key: "rooms",
      label: t("menu.rooms"),
      href: "/rooms",
      icon: Icon.puzzle,
    },
    {
      key: "createRoom",
      label: t("menu.createRoom"),
      href: "/rooms/create",
      icon: Icon.plus,
      level: 2,
    },
  ]).map((item) => ({
    ...item,
    active: !!(
      item.href === pathname ||
      (item.href && routeMatching(item.href, pathname, item.level ?? 1))
    ),
  }));

  const jeopardyItems = filteredArray<Keyed<Item>>([
    {
      key: "packs",
      label: t("menu.jeopardy.packs"),
      href: "/jeopardy/packs",
      icon: Icon.questionMarkCircle,
      level: 2,
    },
    {
      key: "createPack",
      label: t("menu.jeopardy.createPack"),
      href: "/jeopardy/packs/create",
      icon: Icon.plus,
      level: 3,
    },
  ]).map((item) => ({
    ...item,
    active: !!(
      item.href === pathname ||
      (item.href && routeMatching(item.href, pathname, item.level ?? 1))
    ),
  }));

  return (
    <>
      <UiSidebarGroup>
        {items.map(({ key, ...item }) => (
          <UiSidebarItem key={key} {...item} />
        ))}
      </UiSidebarGroup>
      <UiSidebarGroup>
        <UiSidebarLabel>{t("rooms:type.jeopardy")}</UiSidebarLabel>
        {jeopardyItems.map(({ key, ...item }) => (
          <UiSidebarItem key={key} {...item} />
        ))}
      </UiSidebarGroup>
      <UiSidebarGroup>
        <UiSidebarLabel>{t("rooms:type.sixMinds")}</UiSidebarLabel>
      </UiSidebarGroup>
    </>
  );
}
