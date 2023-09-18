import { JeopardyPacksListOutput, jeopardyPacksListRequest } from "@/api";
import { Field, Form, Submit } from "@/app/components/form";
import { getServerTranslation } from "@/i18n/getServerTranslation";
import Pagination from "@/app/components/pagination/Pagination";
import { Icon } from "@/ui/components/icon";
import { UiInput } from "@/ui/components/input";
import { UiFieldModifier } from "@/ui/components/field";
import { getServerSearch } from "@/session/getServerSearch";
import { UiButton, UiButtonSize } from "@/ui/components/button";
import { nanvigateToJeopardyPacksList } from "@/app/api/jeopardy/navigateToJeopardyPacksList";
import { UiJeopardyPacksFilterLayout } from "@/ui/layouts/jeopardy-packs-filter-layout";
import { withLocale } from "@/i18n/withLocale";
import JeopardyPacksCreatorFilter from "@/app/components/jeopardy/packsList/JeopardyPacksCreatorFilter";

export type JeopardyPacksFilterProps = JeopardyPacksListOutput;

export default async function JeopardyPacksFilter({
  total,
  page,
  limit,
}: JeopardyPacksFilterProps) {
  const { t } = await getServerTranslation("jeopardy");

  return (
    <Form
      mutate={nanvigateToJeopardyPacksList}
      initialValues={getServerSearch(jeopardyPacksListRequest)}
    >
      <UiJeopardyPacksFilterLayout
        query={
          <Field name="filter.query">
            <UiInput
              placeholder={t("query")}
              modifier={UiFieldModifier.noElevation}
            />
          </Field>
        }
        creator={withLocale(<JeopardyPacksCreatorFilter />)}
        submit={
          <Submit>
            <UiButton
              label={t("search")}
              size={UiButtonSize.large}
              after={Icon.chevronRight}
            />
          </Submit>
        }
        pagination={
          !!(limit && page) && (
            <Pagination totalPages={Math.max(Math.ceil(total / limit), 1)} />
          )
        }
      />
      <button aria-labelledby="hiddensubmit" type="submit" hidden />
    </Form>
  );
}
