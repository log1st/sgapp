import { RoomType } from "@/api";
import { UiIcon } from "@/ui/components/icon";
import { getRoomTypeIcon } from "@/app/components/rooms/utils/getRoomTypeIcon";
import { getServerTranslation } from "@/i18n/getServerTranslation";

export const getRoomTypesOptions = async () => {
  const { t } = await getServerTranslation("rooms", {
    keyPrefix: "type",
  });

  return Object.values(RoomType).map((value) => ({
    value,
    label: t(value),
    hint: <UiIcon icon={getRoomTypeIcon(value)} size={20} />,
  }));
};
