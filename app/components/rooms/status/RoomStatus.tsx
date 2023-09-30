"use client";

import { filteredArray, formatAgo } from "@/utils";
import { UiBadge, UiBadgeColor } from "@/ui/components/badge";
import { GetRoomOutput } from "@/api";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { Icon, UiIcon } from "@/ui/components/icon";
import { UiTypography } from "@/ui/utils/typography";
import Status, {
  StatusFlyout,
  StatusProps,
} from "@/app/components/status/Status";

export type RoomStatusProps = {
  room: Pick<
    GetRoomOutput,
    | "status"
    | "finishedAt"
    | "hasPassword"
    | "createdAt"
    | "private"
    | "jeopardyConfig"
  >;
  lng?: string;
  placement?: StatusProps["placement"];
};

export default function RoomStatus({
  room,
  lng = "en",
  placement,
}: RoomStatusProps) {
  const { t } = useClientTranslation("rooms", undefined, lng);

  const flyOuts = filteredArray<StatusFlyout>([
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
      { placement: "left" },
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
      { placement: "top" },
    ],
    room.private && [
      "private",
      <UiTypography color={room.private ? "tag-red-text" : "tag-green-text"}>
        <UiIcon icon={room.private ? Icon.eyeSlash : Icon.eye} size={16} />
      </UiTypography>,
      t(`private.${room.private}`),
      { placement: "top" },
    ],
    !!room.jeopardyConfig?.pack && [
      "pack",
      <UiTypography>{room.jeopardyConfig?.pack?.name}</UiTypography>,
      t(`pack`),
    ],
  ]);

  return <Status flyOuts={flyOuts} placement={placement} />;
}
