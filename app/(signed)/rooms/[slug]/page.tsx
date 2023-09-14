import { db } from "@/api/db";

export type RoomSlugPageProps = {
  params: {
    slug: string;
  };
};

export default async function RoomSlugPage({
  params: { slug },
}: RoomSlugPageProps) {
  const data = await db.room.findFirst({
    where: {
      slug,
    },
    include: {
      creator: true,
      jeopardyConfig: true,
    },
  });

  return (
    <pre style={{ overflow: "auto", blockSize: "100dvh", padding: "20px" }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
