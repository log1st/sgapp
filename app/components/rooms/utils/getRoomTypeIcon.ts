import { RoomType } from "@/api";
import { Icon } from "@/ui/components/icon";

export const getRoomTypeIcon = (type: RoomType) =>
  ({
    sixMinds: Icon.sixMindsLogo,
    jeopardy: Icon.jeopardyLogo,
  })[type];
