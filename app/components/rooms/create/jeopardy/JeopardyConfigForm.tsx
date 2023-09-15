import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
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
import Flyout from "@/app/components/flyout/Flyout";
import { Icon, UiIcon } from "@/ui/components/icon";
import { UiTypography, UiTypographyType } from "@/ui/utils/typography";
import { UiTooltip } from "@/ui/components/tooltip";
import { useSelect } from "@/hooks/useSelect";
import { fetchJeopardyPacksList } from "@/app/api/jeopardy/fetchJeopardyPacksList";

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
  questionPackId: null as any,
});

type TooltipProps = PropsWithChildren<{ label?: ReactNode }>;

function Tooltip({ label, children }: TooltipProps) {
  return (
    <Flyout
      flyout={
        <UiTooltip>
          <UiTypography color="fg-base" type={UiTypographyType.mediumPlus}>
            {label}
          </UiTypography>
          <UiTypography type={UiTypographyType.compactSmall}>
            {children}
          </UiTypography>
        </UiTooltip>
      }
      options={{ placement: "top" }}
      delay={0}
    >
      <UiTypography color="fg-muted">
        <UiIcon size={16} icon={Icon.informationCircleSolid} />
      </UiTypography>
    </Flyout>
  );
}

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

  const packSelect = useSelect(fetchJeopardyPacksList, "query");

  const [{ value: questionPackId }] = useField<number>("config.questionPackId");

  const [selectedOption, setSelectedOption] = useState(
    packSelect.options.find((pack) => pack.id === questionPackId),
  );

  useEffect(() => {
    setSelectedOption(
      packSelect.options.find((pack) => pack.id === questionPackId),
    );
  }, [questionPackId]);

  return (
    <UiJeopardyConfigForm>
      <UiJeopardyConfigFullField>
        <Field
          name="config.questionPackId"
          label={t("field.config.questionPackId.label")}
        >
          <UiSelect
            queryPlaceholder={t("field.config.questionPackId.query")}
            {...packSelect}
            displayIndex="name"
            valueIndex="id"
            hintIndex={["creator", "login"]}
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
            icon={hint && <Tooltip label={label}>{hint}</Tooltip>}
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
            icon={hint && <Tooltip label={label}>{hint}</Tooltip>}
          >
            <UiInput htmlType={UiInputType.number} />
          </Field>
        );
      })}
    </UiJeopardyConfigForm>
  );
}
