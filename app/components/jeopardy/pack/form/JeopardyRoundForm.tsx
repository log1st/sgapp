import { UiGrid } from "@/ui/utils/grid";
import {
  UiButton,
  UiButtonModifier,
  UiButtonSize,
  UiButtonVariant,
} from "@/ui/components/button";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { UiInput } from "@/ui/components/input";
import { Field } from "@/app/components/form";
import { UiSelect } from "@/ui/components/select";
import { UiFieldModifier } from "@/ui/components/field";

export type JeopardyRoundFormProps = {
  remove(): void;
  name: string;
  lng?: string;
};

export default function JeopardyRoundForm({
  remove,
  name,
  lng = "en",
}: JeopardyRoundFormProps) {
  const { t } = useClientTranslation(
    "jeopardy",
    {
      keyPrefix: "packs.round",
    },
    lng,
  );

  const typesOptions = ["normal", "final"].map((value) => ({
    value,
    label: t(`field.type.types.${value}`),
  }));

  return (
    <UiGrid columns={16} gutter={16} align="end">
      <UiGrid.Span span={[1, 4]}>
        <Field name={`${name}.type`} label={t("field.type.label")}>
          <UiSelect
            modifier={UiFieldModifier.noElevation}
            options={typesOptions}
          />
        </Field>
      </UiGrid.Span>
      <UiGrid.Span span={[5, 8]}>
        <Field name={`${name}.name`} label={t("field.name.label")}>
          <UiInput modifier={UiFieldModifier.noElevation} />
        </Field>
      </UiGrid.Span>
      <UiGrid.Span span={[13, 4]}>
        <UiButton
          modifier={UiButtonModifier.block}
          variant={UiButtonVariant.danger}
          label={t("remove")}
          onClick={remove}
          size={UiButtonSize.large}
        />
      </UiGrid.Span>
    </UiGrid>
  );
}
