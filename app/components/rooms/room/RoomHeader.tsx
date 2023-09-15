import { UiRoomHeaderLayout } from "@/ui/layouts/room-header-layout";
import { GetRoomOutput } from "@/api";
import { getRoomTypeIcon } from "@/app/components/rooms/utils/getRoomTypeIcon";
import RoomTitle from "@/app/components/rooms/room/parts/RoomTitle";
import { getSessionLanguage } from "@/i18n/getSessionLanguage";
import RoomStatus from "../status/RoomStatus";
import UserCard from "@/app/components/user/UserCard";

export type RoomHeaderProps = {
  room: GetRoomOutput;
};

export default async function RoomHeader({ room }: RoomHeaderProps) {
  return (
    <UiRoomHeaderLayout
      icon={getRoomTypeIcon(room.type)}
      title={<RoomTitle lng={getSessionLanguage()} room={room} />}
      status={
        <RoomStatus placement="bottom" room={room} lng={getSessionLanguage()} />
      }
      creator={<UserCard user={room.creator} />}
    />
  );
}
