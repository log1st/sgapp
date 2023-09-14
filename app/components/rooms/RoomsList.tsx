"use client";

import { Route } from "next";
import {
  UiActiveTable,
  UiActiveTableColumn,
  UiActiveTableType,
} from "@/ui/components/active-table";
import { RoomType, RoomsListOutput } from "@/api";
import { filteredArray } from "@/utils";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { UiGameTypeLayout } from "@/ui/layouts/game-type-layout";
import { Icon } from "@/ui/components/icon";

export type RoomsListProps = RoomsListOutput & {
  lng?: string;
};

export default function RoomsList({ lng, data, total, page }: RoomsListProps) {
  const { t } = useClientTranslation("rooms", undefined, lng);

  const columns = filteredArray<UiActiveTableColumn<(typeof data)[number]>>([
    {
      key: "type",
      label: t(`field.type`),
      render: (_, value: RoomType) => (
        <UiGameTypeLayout
          icon={
            {
              jeopardy: Icon.chevronUpDown,
              sixMinds: Icon.channels,
            }[value]
          }
        >
          {t(`type.${value}`)}
        </UiGameTypeLayout>
      ),
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
