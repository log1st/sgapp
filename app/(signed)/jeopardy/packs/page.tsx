import { getServerSearch } from "@/session/getServerSearch";
import { jeopardyPacksListRequest } from "@/api";
import { UiListPageLayout } from "@/ui/layouts/list-page-layout";
import { fetchJeopardyPacksList } from "@/app/api/jeopardy/fetchJeopardyPacksList";
import { withLocale } from "@/i18n/withLocale";
import JeopardyPacksList from "@/app/components/jeopardy/packsList/JeopardyPacksList";

export default async function JeopardyPacksPage() {
  const search = getServerSearch(jeopardyPacksListRequest);
  const response = await fetchJeopardyPacksList(search);

  return (
    <UiListPageLayout filter="filter">
      {response.success && withLocale(<JeopardyPacksList {...response.data} />)}
    </UiListPageLayout>
  );
}
