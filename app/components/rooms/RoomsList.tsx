"use client";

import { Route } from "next";
import {
  UiActiveTable,
  UiActiveTableColumn,
  UiActiveTableType,
} from "@/ui/components/active-table";
import { RoomsListOutput, RoomType } from "@/api";
import { filteredArray } from "@/utils";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { UiGameTypeLayout } from "@/ui/layouts/game-type-layout";
import { UiUserLayout } from "@/ui/layouts/user-layout";
import { UiAvatar, UiAvatarSize } from "@/ui/components/avatar";
import { getRoomTypeIcon } from "@/app/components/rooms/utils/getRoomTypeIcon";
import RoomStatus from "./status/RoomStatus";

export type RoomsListProps = RoomsListOutput & {
  lng?: string;
};

export default function RoomsList({ lng = "en", data }: RoomsListProps) {
  const { t } = useClientTranslation("rooms", undefined, lng);

  const columns = filteredArray<UiActiveTableColumn<(typeof data)[number]>>([
    {
      key: "type",
      label: t(`field.type`),
      width: "auto",
      render: (_, value: RoomType) => (
        <UiGameTypeLayout icon={getRoomTypeIcon(value)}>
          {t(`type.${value}`)}
        </UiGameTypeLayout>
      ),
    },
    {
      key: "title",
      label: t("field.title"),
    },
    {
      key: "creator",
      label: t("field.creator"),
      render: (record) =>
        record.creator ? (
          <UiUserLayout
            avatar={
              <UiAvatar
                size={UiAvatarSize.base}
                image={record.creator.avatar}
                letters={record.creator.login[0]}
              />
            }
          >
            {record.creator.login}
          </UiUserLayout>
        ) : null,
    },
    {
      key: "status",
      label: t("field.status"),
      width: "auto",
      render: (record) => <RoomStatus lng={lng} room={record} />,
    },
  ]);

  return (
    <UiActiveTable
      keyIndex="id"
      records={data || []}
      columns={columns}
      type={UiActiveTableType.rooms}
      getRowHref={"/rooms/[slug]" as Route}
    />
  );
}
