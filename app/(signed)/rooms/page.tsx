import { UiRoomsListPageLayout } from "@/app/ui/layouts/rooms-list-page-layout";
import { fetchRoomsList } from "@/app/api/rooms/fetchRoomsList";
import { getServerSearch } from "@/session/getServerSearch";
import { roomsListRequest } from "@/api";
import RoomsList from "@/app/components/rooms/RoomsList";
import { withLocale } from "@/i18n/withLocale";

export default async function RoomsPage() {
  const search = getServerSearch(roomsListRequest);
  const response = await fetchRoomsList(search);

  return (
    <UiRoomsListPageLayout filter={<div>filter</div>}>
      {response.data && withLocale(<RoomsList {...response.data} />)}
    </UiRoomsListPageLayout>
  );
}
