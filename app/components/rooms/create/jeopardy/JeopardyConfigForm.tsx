import { PropsWithChildren, ReactNode } from "react";
import { Field } from "@/app/components/form";
import { UiJeopardyConfigForm } from "@/ui/layouts/jeopardy-config-form";
import { UiInput, UiInputType } from "@/ui/components/input";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { UiSelect } from "@/ui/components/select";
import { UiCheckbox } from "@/ui/components/checkbox";
import { CreateRoomInput } from "@/api";
import Flyout from "@/app/components/flyout/Flyout";
import { Icon, UiIcon } from "@/ui/components/icon";
import { UiTypography, UiTypographyType } from "@/ui/utils/typography";
import { UiTooltip } from "@/ui/components/tooltip";

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

  return (
    <UiJeopardyConfigForm>
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
            label={t(`field.config.${field}.label`)}
            icon={hint && <Tooltip label={label}>{hint}</Tooltip>}
            valuePropName="checked"
          >
            <UiCheckbox style={{ blockSize: "40px" }} />
          </Field>
        );
      })}
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
