export type JeopardyPacksIdPageProps = {
  params: {
    id: string;
  };
};

export default function JeopardyPacksIdPage({
  params: { id },
}: JeopardyPacksIdPageProps) {
  return <div>{id}</div>;
}
