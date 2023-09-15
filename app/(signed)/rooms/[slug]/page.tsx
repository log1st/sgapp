import { UiRoomPageLayout } from "@/ui/layouts/room-page-layout";
import { fetchRoom } from "@/app/api/rooms/fetchRoom";
import RoomHeader from "@/app/components/rooms/room/RoomHeader";

export type RoomSlugPageProps = {
  params: {
    slug: string;
  };
};

export default async function RoomSlugPage({
  params: { slug },
}: RoomSlugPageProps) {
  const data = await fetchRoom({ slug });

  return (
    <UiRoomPageLayout header={<RoomHeader room={data} />}>
      {JSON.stringify(data, null, 2)}
    </UiRoomPageLayout>
  );
}
