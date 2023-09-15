"use client";

import { Key, ReactNode } from "react";
import { Placement } from "@popperjs/core";
import { filteredArray, formatAgo } from "@/utils";
import { UiBadge, UiBadgeColor } from "@/ui/components/badge";
import Flyout from "@/app/components/flyout/Flyout";
import { GetRoomOutput } from "@/api";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { UseFlyoutOptions } from "@/ui/hooks/useFlyout";
import { UiTooltip } from "@/ui/components/tooltip";
import { Icon, UiIcon } from "@/ui/components/icon";
import { UiRoomStatusLayout } from "@/ui/layouts/room-status-layout";
import { UiTypography } from "@/ui/utils/typography";

export type RoomStatusProps = {
  room: Pick<
    GetRoomOutput,
    "status" | "finishedAt" | "hasPassword" | "createdAt" | "private"
  >;
  lng?: string;
  placement?: Placement;
};

type RoomStatusFlyout =
  | [Key, ReactNode, ReactNode]
  | [Key, ReactNode, ReactNode, UseFlyoutOptions];

export default function RoomStatus({
  room,
  lng = "en",
  placement,
}: RoomStatusProps) {
  const { t } = useClientTranslation("rooms", undefined, lng);

  const flyOuts = filteredArray<RoomStatusFlyout>([
    [
      "status",
      <UiBadge
        color={
          {
            new: UiBadgeColor.gray,
            inProgress: UiBadgeColor.blue,
            finished: UiBadgeColor.red,
          }[room.status]
        }
      >
        {t(`status.${room.status}`)}
      </UiBadge>,
      room.finishedAt
        ? t("finishedAt", {
            date: formatAgo(lng, room.finishedAt, {
              addSuffix: true,
              includeSeconds: true,
            }),
          })
        : t("startedAt", {
            date: formatAgo(lng, room.createdAt, {
              addSuffix: true,
              includeSeconds: true,
            }),
          }),
      { placement: placement ?? "left" },
    ],
    [
      "hasPassword",
      <UiTypography
        color={room.hasPassword ? "tag-red-text" : "tag-green-text"}
      >
        <UiIcon
          icon={room.hasPassword ? Icon.lockClosedSolid : Icon.lockOpenSolid}
          size={16}
        />
      </UiTypography>,
      t(`password.${room.hasPassword}`),
      { placement: placement ?? "top" },
    ],
    room.private && [
      "private",
      <UiTypography color={room.private ? "tag-red-text" : "tag-green-text"}>
        <UiIcon icon={room.private ? Icon.eyeSlash : Icon.eye} size={16} />
      </UiTypography>,
      t(`private.${room.private}`),
      { placement: placement ?? "top" },
    ],
  ]);

  return (
    <UiRoomStatusLayout>
      {flyOuts.map(([key, trigger, tooltip, options]) => (
        <Flyout
          key={key}
          flyout={<UiTooltip>{tooltip}</UiTooltip>}
          options={options}
          delay={0}
        >
          {trigger}
        </Flyout>
      ))}
    </UiRoomStatusLayout>
  );
}
