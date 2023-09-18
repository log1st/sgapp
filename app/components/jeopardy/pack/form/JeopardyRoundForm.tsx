import { useFormikContext } from "formik";
import { SortEndHandler } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { UiGrid } from "@/ui/utils/grid";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { UiInput } from "@/ui/components/input";
import { Field, FormError } from "@/app/components/form";
import { UiSelect } from "@/ui/components/select";
import { UiFieldModifier } from "@/ui/components/field";
import { CreateJeopardyPackInput } from "@/api";
import {
  UiButton,
  UiButtonModifier,
  UiButtonVariant,
} from "@/ui/components/button";
import { Icon } from "@/ui/components/icon";
import { randomString } from "@/utils";
import { JeopardyQuestionsForm } from "@/app/components/jeopardy/pack/form/JeopardyQuestionForm";

export type JeopardyRoundFormProps = {
  remove(): void;
  name: string;
  lng?: string;
  round: CreateJeopardyPackInput["rounds"][number];
  index: number;
};

export default function JeopardyRoundForm({
  name,
  lng = "en",
  round,
  index,
}: JeopardyRoundFormProps) {
  const { t } = useClientTranslation(
    "jeopardy",
    {
      keyPrefix: "packs.form",
    },
    lng,
  );

  const typesOptions = ["normal", "final"].map((value) => ({
    value,
    label: t(`field.rounds.type.types.${value}`),
  }));

  const { values, setFieldValue } = useFormikContext<CreateJeopardyPackInput>();

  const addQuestion = () => {
    setFieldValue(
      `${name}.questions`,
      values.rounds[index].questions.concat([
        {
          key: randomString(),
          text: "",
          cost: 0,
          secretCost: 0,
          commonSecretCostReveal: "before",
          secretMinMaxCost: [0, 0, 100],
          secretTopic: "",
          selfSecret: false,
          type: "normal",
          answers: [],
          hint: "",
          secretCostType: "fixed",
          medias: [],
        },
      ]),
    );
  };

  const removeQuestion = (i: number) => () => {
    setFieldValue(
      `${name}.questions`,
      values.rounds[index].questions.toSpliced(i, 1),
    );
  };
  const sortQuestions: SortEndHandler = (e) => {
    setFieldValue(
      `${name}.questions`,
      arrayMoveImmutable(
        values.rounds[index].questions,
        e.oldIndex,
        e.newIndex,
      ),
    );
  };

  return (
    <UiGrid columns={16} gutter={16}>
      <UiGrid.Span span={[1, 4]}>
        <Field name={`${name}.type`} label={t("field.rounds.type.label")}>
          <UiSelect
            modifier={UiFieldModifier.noElevation}
            options={typesOptions}
          />
        </Field>
      </UiGrid.Span>
      <UiGrid.Span span={[5, 12]}>
        <Field name={`${name}.name`} label={t("field.rounds.name.label")}>
          <UiInput modifier={UiFieldModifier.noElevation} />
        </Field>
      </UiGrid.Span>
      {!!round.questions.length && (
        <JeopardyQuestionsForm
          items={round.questions}
          t={t}
          axis="y"
          lockAxis="y"
          lockToContainerEdges
          useDragHandle
          name={name}
          removeQuestion={removeQuestion}
          onSortEnd={sortQuestions}
        />
      )}
      <FormError
        style={{ justifyContent: "center" }}
        name={`${name}.questions`}
      />
      <UiGrid.Span span={[7, 4]}>
        <UiButton
          variant={UiButtonVariant.transparent}
          modifier={UiButtonModifier.block}
          before={Icon.plus}
          label={t("addQuestion")}
          onClick={addQuestion}
        />
      </UiGrid.Span>
    </UiGrid>
  );
}
