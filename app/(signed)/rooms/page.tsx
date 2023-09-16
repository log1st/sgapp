import { fetchRoomsList } from "@/app/api/rooms/fetchRoomsList";
import { getServerSearch } from "@/session/getServerSearch";
import { roomsListRequest } from "@/api";
import RoomsList from "@/app/components/rooms/RoomsList";
import { withLocale } from "@/i18n/withLocale";
import RoomsFilter from "@/app/components/rooms/RoomsFilter";
import { UiListPageLayout } from "@/ui/layouts/list-page-layout";

export default async function RoomsPage() {
  const search = getServerSearch(roomsListRequest);
  const response = await fetchRoomsList(search);

  return (
    <UiListPageLayout
      filter={response.data && <RoomsFilter {...response.data} />}
    >
      {response.data && withLocale(<RoomsList {...response.data} />)}
    </UiListPageLayout>
  );
}
