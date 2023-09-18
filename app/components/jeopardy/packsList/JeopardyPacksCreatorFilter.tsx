"use client";

import { UiFieldModifier } from "@/ui/components/field";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { UiSelect } from "@/ui/components/select";
import { useSelect } from "@/hooks";
import { fetchUsersList } from "@/app/api/users/fetchUsersList";
import { Field } from "../../form";

export type JeopardyPacksCreatorFilterProps = {
  lng?: string;
};

export default function JeopardyPacksCreatorFilter({
  lng,
}: JeopardyPacksCreatorFilterProps) {
  const { t } = useClientTranslation("jeopardy", undefined, lng);

  const params = useSelect(fetchUsersList, ["filter", "query"]);

  return (
    <Field name="filter.creator">
      <UiSelect
        placeholder={t("creator")}
        modifier={UiFieldModifier.noElevation}
        displayIndex="login"
        valueIndex="id"
        multiple
        {...params}
      />
    </Field>
  );
}
