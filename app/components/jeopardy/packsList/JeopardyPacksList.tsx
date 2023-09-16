"use client";

import { Route } from "next";
import { JeopardyPacksListOutput } from "@/api";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { filteredArray, formatDate } from "@/utils";
import {
  UiActiveTable,
  UiActiveTableColumn,
  UiActiveTableType,
} from "@/ui/components/active-table";
import UserCard from "@/app/components/user/UserCard";
import { JeopardyPackStatus } from "../pack/status/JeopardyPackStatus";

export type JeopardyPacksListProps = JeopardyPacksListOutput & {
  lng?: string;
};

export default function JeopardyPacksList({
  lng = "en",
  data,
}: JeopardyPacksListProps) {
  const { t } = useClientTranslation(
    "jeopardy",
    {
      keyPrefix: "packs",
    },
    lng,
  );

  const columns = filteredArray<UiActiveTableColumn<(typeof data)[number]>>([
    {
      key: "name",
      label: t(`field.name`),
    },
    {
      key: "creator",
      label: t(`field.creator`),
      render: (record) => <UserCard user={record.creator} />,
    },
    {
      key: "info",
      label: t(`field.info`),
      render: (record) => <JeopardyPackStatus pack={record} />,
    },
    {
      key: "createdAt",
      label: t(`field.createdAt`),
      render: (_, value: Date) => formatDate(lng, value),
    },
  ]);

  return (
    <UiActiveTable
      keyIndex="id"
      records={data || []}
      columns={columns}
      type={UiActiveTableType.jeopardyPacks}
      getRowHref={"/jeopardy/packs/[id]" as Route}
    />
  );
}
