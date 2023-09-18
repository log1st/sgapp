import { useEffect, useState } from "react";
import { useField } from "formik";
import { Field } from "@/app/components/form";
import {
  UiJeopardyConfigForm,
  UiJeopardyConfigFullField,
} from "@/ui/layouts/jeopardy-config-form";
import { UiInput, UiInputType } from "@/ui/components/input";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { UiSelect } from "@/ui/components/select";
import { UiCheckbox } from "@/ui/components/checkbox";
import { CreateRoomInput } from "@/api";
import { useSelect } from "@/hooks/useSelect";
import { fetchJeopardyPacksList } from "@/app/api/jeopardy/fetchJeopardyPacksList";
import { JeopardyPackStatus } from "@/app/components/jeopardy/pack/status/JeopardyPackStatus";
import IconTooltip from "@/app/components/iconTooltip/IconTooltip";

export type JeopardyConfigFormProps = {
  lng?: string;
};

export const getJeopardyConfig = (): CreateRoomInput["config"] => ({
  type: "jeopardy",
  maxPlayers: 2,
  answerType: "voice",
  partialText: true,
  falseStarts: false,
  previewAnswers: true,
  readingSpeed: 20,
  stepByStep: true,
  appellations: true,
  noPenalty: false,
  awaitSync: true,
  preloadMedia: true,

  choosingQuestionTime: 30,
  thinkingOnQuestionTime: 5,
  answerTime: 25,
  givingSecretQuestionTime: 30,
  makingStakeTime: 30,
  thinkingOnStakeQuestionTime: 30,
  printingAnswerTime: 2,
  roundTime: 660,
  choosingFinalCategoryTime: 30,
  thinkingOnFinalQuestionTime: 45,
  answerValidationTime: 30,
  mediaPauseTime: 0,
  falseStartTime: 3,
  packId: null as any,
});

export default function JeopardyConfigForm({
  lng = "en",
}: JeopardyConfigFormProps) {
  const { t } = useClientTranslation(
    "rooms",
    {
      keyPrefix: "form",
    },
    lng,
  );

  const { options, ...packSelect } = useSelect(fetchJeopardyPacksList, "query");

  const richOptions = options.map((option) => ({
    ...option,
    status: <JeopardyPackStatus pack={option} placement="bottom" span />,
  }));

  const [{ value: packId }] = useField<number>("config.packId");

  const [selectedOption, setSelectedOption] = useState(
    richOptions.find((pack) => pack.id === packId),
  );

  useEffect(() => {
    setSelectedOption(richOptions.find((pack) => pack.id === packId));
  }, [packId]);

  return (
    <UiJeopardyConfigForm>
      <UiJeopardyConfigFullField>
        <Field name="config.packId" label={t("field.config.packId.label")}>
          <UiSelect
            queryPlaceholder={t("field.config.packId.query")}
            {...packSelect}
            displayIndex="name"
            valueIndex="id"
            options={richOptions}
            hintIndex="status"
            renderDisplayValue={(_, option) =>
              option?.name ?? selectedOption?.name
            }
          />
        </Field>
      </UiJeopardyConfigFullField>
      {[
        "partialText",
        "falseStarts",
        "previewAnswers",
        "stepByStep",
        "appellations",
        "noPenalty",
        "awaitSync",
        "preloadMedia",
      ].map((field) => {
        const hint = t(`field.config.${field}.hint`);
        const label = t(`field.config.${field}.label`);

        return (
          <Field
            key={field}
            name={`config.${field}`}
            icon={hint && <IconTooltip label={label}>{hint}</IconTooltip>}
            valuePropName="checked"
            fixedSize={30}
            label={t(`field.config.${field}.label`)}
          >
            <UiCheckbox />
          </Field>
        );
      })}
      <Field
        name="config.answerType"
        label={t("field.config.answerType.label")}
      >
        <UiSelect
          options={["voice", "text"].map((value) => ({
            value,
            label: t(`field.config.answerType.value.${value}`),
          }))}
        />
      </Field>
      <Field
        name="config.maxPlayers"
        label={t("field.config.maxPlayers.label")}
      >
        <UiInput htmlType={UiInputType.number} />
      </Field>
      {[
        "readingSpeed",
        "choosingQuestionTime",
        "thinkingOnQuestionTime",
        "answerTime",
        "givingSecretQuestionTime",
        "makingStakeTime",
        "thinkingOnStakeQuestionTime",
        "printingAnswerTime",
        "roundTime",
        "choosingFinalCategoryTime",
        "thinkingOnFinalQuestionTime",
        "answerValidationTime",
        "mediaPauseTime",
        "falseStartTime",
      ].map((field) => {
        const hint = t(`field.config.${field}.hint`);
        const label = t(`field.config.${field}.label`);

        return (
          <Field
            key={field}
            name={`config.${field}`}
            label={t(`field.config.${field}.label`)}
            icon={hint && <IconTooltip label={label}>{hint}</IconTooltip>}
          >
            <UiInput htmlType={UiInputType.number} />
          </Field>
        );
      })}
    </UiJeopardyConfigForm>
  );
}
