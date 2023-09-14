import { RoomStatus } from "@/api";
import { getServerTranslation } from "@/i18n/getServerTranslation";

export const getRoomStatusesOptions = async () => {
  const { t } = await getServerTranslation("rooms", {
    keyPrefix: "status",
  });

  return Object.values(RoomStatus).map((value) => ({
    value,
    label: t(value),
  }));
};
