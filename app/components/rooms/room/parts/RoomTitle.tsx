"use client";

import { Trans } from "react-i18next";
import { GetRoomOutput } from "@/api";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { UiTypography, UiTypographyType } from "@/ui/utils/typography";

export type RoomTitleProps = {
  lng?: string;
  room: GetRoomOutput;
};

export default function RoomTitle({ lng = "en", room }: RoomTitleProps) {
  const { t } = useClientTranslation("rooms", undefined, lng);

  return (
    <UiTypography type={UiTypographyType.xLargePlus}>{room.title}</UiTypography>
  );

  // eslint-disable-next-line no-unreachable
  return (
    <Trans
      t={t}
      i18nKey="room.title"
      values={{
        type: t(`type.${room.type}`),
        title: room.title,
      }}
      components={{
        title: <UiTypography type={UiTypographyType.xLargePlus} />,
      }}
    />
  );
}
