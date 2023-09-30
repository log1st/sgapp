"use client";

import { ReactNode } from "react";
import { useFormikContext } from "formik";
import { Trans } from "react-i18next";
import { SortEndHandler } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { useEffectOnce } from "react-use";
import { UiDialog } from "@/ui/components/dialog";
import { Field, FormError, Submit, useForm } from "@/app/components/form";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { UiInput } from "@/ui/components/input";
import { UiGrid } from "@/ui/utils/grid";
import { UiCheckbox } from "@/ui/components/checkbox";
import { UiSelect } from "@/ui/components/select";
import { CreateJeopardyPackInput, JeopardyPackDifficulty } from "@/api";
import IconTooltip from "@/app/components/iconTooltip/IconTooltip";
import { Icon, UiIcon } from "@/ui/components/icon";
import { randomString } from "@/utils";
import { UiTypography } from "@/ui/utils/typography";
import { UiKbd } from "@/ui/components/kbd";
import { UiPureButton } from "@/ui/components/pure-button";
import { UiButtonSize } from "@/ui/components/button";
import JeopardyPackRoundForm from "@/app/components/jeopardy/pack/form/JeopardyRoundForm";
import { JeopardyPackRoundTabs } from "@/app/components/jeopardy/pack/form/tabs/JeopardyPackRoundTabs";

export type JeopardyPackFormProps = {
  lng?: string;
  title?: ReactNode;
  submitLabel?: ReactNode;
};

export default function JeopardyPackForm({
  lng = "en",
  title,
  submitLabel,
}: JeopardyPackFormProps) {
  const { t } = useClientTranslation(
    "jeopardy",
    {
      keyPrefix: "packs.form",
    },
    lng,
  );

  const difficultiesOptions = Array.from({
    length: JeopardyPackDifficulty.max - JeopardyPackDifficulty.min + 1,
  })
    .map((_, i) => i + JeopardyPackDifficulty.min)
    .map((value) => ({
      value,
      label: value,
    }));

  const { values, setFieldValue } = useFormikContext<CreateJeopardyPackInput>();

  const { state, setState } = useForm<{ round: string | null }>();

  useEffectOnce(() => {
    setState("round", state.round ?? null);
  });

  const handleRound = (key: string | null) => {
    setState("round", key);
  };

  const addRound = async () => {
    const key = randomString();
    await setFieldValue("rounds", [
      ...values.rounds,
      {
        key,
        type: "normal",
        name: t("round", {
          number: values.rounds.length + 1,
        }),
        topics: [],
      },
    ]);
    handleRound(key);
  };

  const removeRound = (index: number) => async () => {
    const newRound =
      values.rounds[index]?.key === state.round
        ? values.rounds[index - 1]?.key ??
          values.rounds[index === 0 ? 1 : 0]?.key ??
          null
        : state.round;
    await setFieldValue("rounds", values.rounds.toSpliced(index, 1));
    handleRound(newRound);
  };

  const sortRounds: SortEndHandler = (e) => {
    setFieldValue(
      "rounds",
      arrayMoveImmutable(values.rounds, e.oldIndex, e.newIndex),
    );
  };

  return (
    <UiGrid gutter={24}>
      <UiDialog title={title}>
        <UiGrid columns={24} gutter={16}>
          <UiGrid.Span span={[1, 4]}>
            <Field name="difficulty" label={t("field.difficulty.label")}>
              <UiSelect options={difficultiesOptions} />
            </Field>
          </UiGrid.Span>
          <UiGrid.Span span={[5, 16]}>
            <Field name="name" label={t("field.name.label")}>
              <UiInput autoFocus />
            </Field>
          </UiGrid.Span>
          <UiGrid.Span span={[21, 4]}>
            <Field
              name="private"
              label={t("field.private.label")}
              fixedSize={40}
              valuePropName="checked"
              icon={<IconTooltip label={t("field.private.hint")} />}
            >
              <UiCheckbox />
            </Field>
          </UiGrid.Span>
        </UiGrid>
      </UiDialog>
      <UiDialog
        overflow
        extended
        header={
          <JeopardyPackRoundTabs
            items={values.rounds}
            onSortEnd={sortRounds}
            axis="x"
            lockAxis="x"
            t={t}
            addRound={addRound}
            lockToContainerEdges
            useDragHandle
            removeRound={removeRound}
          />
        }
        actions={[
          {
            key: "submit",
            label: submitLabel,
            size: UiButtonSize.large,
            wrap: Submit,
          },
        ]}
        footer={<FormError />}
      >
        {state.round === null ? (
          <UiTypography align="center" color="fg-subtle">
            <Trans
              t={t}
              i18nKey="noRounds"
              values={{
                kbd: (
                  <UiPureButton
                    onClick={addRound}
                    key="action"
                    interactive
                    active
                  >
                    <UiKbd align="middle" square>
                      <UiIcon size={16} icon={Icon.plus} />
                    </UiKbd>
                  </UiPureButton>
                ),
              }}
            />
          </UiTypography>
        ) : (
          values.rounds.map((round, index) =>
            round.key === state.round ? (
              <JeopardyPackRoundForm
                key={round.key}
                name={`rounds.${index}`}
                remove={removeRound(index)}
                lng={lng}
                round={round}
                index={index}
              />
            ) : null,
          )
        )}
        <FormError name="rounds" style={{ justifyContent: "center" }} />
      </UiDialog>
    </UiGrid>
  );
}
