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
import { getRoomTypeIcon } from "@/app/components/rooms/utils/getRoomTypeIcon";
import RoomStatus from "./status/RoomStatus";
import UserCard from "@/app/components/user/UserCard";
import RoomInfoCard from "@/app/components/rooms/info/RoomInfoCard";
import { UiRoomTypeLayout } from "@/ui/layouts/room-type-layout";

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
        <UiRoomTypeLayout icon={getRoomTypeIcon(value)}>
          {t(`type.${value}`)}
        </UiRoomTypeLayout>
      ),
    },
    {
      key: "title",
      label: t("field.title"),
    },
    {
      key: "creator",
      width: "auto",
      label: t("field.creator"),
      render: (record) => <UserCard user={record.creator} />,
    },
    {
      key: "info",
      width: "auto",
      label: t("field.info"),
      render: (record) => <RoomInfoCard room={record} lng={lng} />,
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
