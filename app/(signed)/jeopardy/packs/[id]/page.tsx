import { fetchJeopardyPack } from "@/app/api/jeopardy/fetchJeopardyPack";
import { UiJeopardyPackPageLayout } from "@/ui/layouts/jeopardy-pack-page-layout";
import JeopardyPackHeader from "@/app/components/jeopardy/pack/header/JeopardyPackHeader";
import {UiGrid} from "@/ui/utils/grid";
import {UiDialog} from "@/ui/components/dialog";

export type JeopardyPacksIdPageProps = {
  params: {
    id: string;
  };
};

export default async function JeopardyPacksIdPage({
  params: { id },
}: JeopardyPacksIdPageProps) {
  const pack = await fetchJeopardyPack({ id: parseInt(id, 10) });

  if (!pack.success) {
    return null;
  }

  return (
    <UiJeopardyPackPageLayout header={<JeopardyPackHeader pack={pack.data} />}>
        <UiGrid gutter={16}>
            {pack.data.rounds.map(round => (
                <UiDialog></UiDialog>
            ))}
        </UiGrid>
    </UiJeopardyPackPageLayout>
  );
}
