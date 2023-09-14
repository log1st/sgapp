export type RoomSlugPageProps = {
  params: {
    slug: string;
  };
};

export default function RoomSlugPage({ params: { slug } }: RoomSlugPageProps) {
  return <div>{slug}</div>;
}
