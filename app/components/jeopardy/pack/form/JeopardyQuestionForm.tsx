import { TFunction } from "i18next";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { CSSProperties, forwardRef } from "react";
import { useField, useFormikContext } from "formik";
import { cloneDeep, omit } from "lodash";
import { UiHoverCard } from "@/ui/components/hover-card";
import { UiGrid } from "@/ui/utils/grid";
import { Field, HasError } from "@/app/components/form";
import {
  CreateJeopardyPackInput,
  jeopardyQuestionSecretCostTypes,
  UploadMediaOutput,
} from "@/api";
import { Icon, UiIcon, UiIconProps } from "@/ui/components/icon";
import { UiSelect } from "@/ui/components/select";
import { UiFieldSize } from "@/ui/components/field";
import { UiInput, UiInputType } from "@/ui/components/input";
import { UiCheckbox } from "@/ui/components/checkbox";
import {
  UiButton,
  UiButtonModifier,
  UiButtonVariant,
} from "@/ui/components/button";
import Flyout, { FlyoutTrigger } from "@/app/components/flyout/Flyout";
import { UiTooltip } from "@/ui/components/tooltip";
import TagInput from "@/app/components/tagInput/TagInput";
import { DropZoneChangeHandler, UiDropZone } from "@/ui/components/drop-zone";
import FormMediaPreview from "@/app/components/media/FormMediaPreview";
import { randomString } from "@/utils";

export type JeopardyQuestionFormProps = {
  name: string;
  remove?(): void;
  t: TFunction;
  value?: any;
};

const DragHandle = SortableHandle<UiIconProps>(
  forwardRef<HTMLDivElement, UiIconProps>(({ style, ...props }, ref) => (
    <div
      ref={ref}
      style={{
        ...style,
        alignSelf: "flex-start",
        marginBlockStart: "30px",
      }}
    >
      <UiIcon {...props} />
    </div>
  )),
);

export const JeopardyQuestionForm = SortableElement<JeopardyQuestionFormProps>(
  ({ name, t, remove }: JeopardyQuestionFormProps) => {
    const types = ["normal", "stake", "secret", "commonSecret", "noRisk"].map(
      (value) => ({
        value,
        label: t(`field.rounds.questions.type.types.${value}`),
      }),
    );

    const [{ value }, , { setValue }] =
      useField<CreateJeopardyPackInput["rounds"][number]["questions"][number]>(
        name,
      );

    const revealOptions = ["before", "after", "never"].map((val) => ({
      value: val,
      label: t(`field.rounds.questions.commonSecretCostReveal.options.${val}`),
    }));

    const secretCostTypesOptions = jeopardyQuestionSecretCostTypes.map(
      (val) => ({
        value: val,
        label: t(`field.rounds.questions.secretCostType.options.${val}`),
      }),
    );

    const uploadMedias: DropZoneChangeHandler = async (event) => {
      const filesToUpload = event.target.value || [];

      await setValue({
        ...value,
        medias: value.medias.concat(
          filesToUpload
            .filter((file) =>
              ["image", "video", "audio"].some((type) =>
                file.type.startsWith(type),
              ),
            )
            .map((file) => ({
              key: randomString(),
              file,
              id: null as unknown as number,
              from: 0,
              to: 0,
            })),
        ),
      });
    };

    const removeMedia = (key: string) => async () => {
      const index = value.medias.findIndex((m) => m.key === key);
      if (index === -1) {
        return;
      }
      await setValue({
        ...value,
        medias: value.medias.toSpliced(index, 1),
      });
    };

    const { setFieldValue } = useFormikContext();

    const setMedia =
      (key: string) =>
      async ({ id, type }: UploadMediaOutput) => {
        const src = cloneDeep(value);
        const index = src.medias.findIndex((m) => m.key === key);
        if (index === -1) {
          return;
        }
        await setFieldValue(`${name}.medias.${index}`, {
          ...omit(value.medias[index], "file"),
          id,
          type,
          file: null,
        });
      };

    return (
      <UiGrid.Span span={[1, 16]}>
        <UiHoverCard
          span
          avatar={<DragHandle icon={Icon.barsThree} size={20} />}
        >
          <UiGrid columns={16} gutter={10}>
            <UiGrid.Span span={[1, 4]}>
              <Field
                name={`${name}.type`}
                label={t("field.rounds.questions.type.label")}
              >
                <UiSelect options={types} size={UiFieldSize.small} />
              </Field>
            </UiGrid.Span>
            <UiGrid.Span span={[5, 4]}>
              <Field
                name={`${name}.cost`}
                label={t("field.rounds.questions.cost.label")}
              >
                <UiInput
                  htmlType={UiInputType.number}
                  min={0}
                  step={1}
                  size={UiFieldSize.small}
                />
              </Field>
            </UiGrid.Span>
            <UiGrid.Span span={[9, 7]}>
              <Field
                name={`${name}.hint`}
                label={t("field.rounds.questions.hint.label")}
              >
                <UiInput size={UiFieldSize.small} />
              </Field>
            </UiGrid.Span>
            <UiGrid.Span span={[16, 1]}>
              <Field name={`${name}.hint`} label>
                <Flyout
                  trigger={FlyoutTrigger.click}
                  flyout={
                    <UiTooltip
                      label={t("action.removeQuestion.hint")}
                      action={[
                        {
                          key: "confirm",
                          label: t("action.removeQuestion.action"),
                          variant: UiButtonVariant.danger,
                          onClick: remove,
                        },
                      ]}
                    />
                  }
                  options={{ placement: "top" }}
                >
                  <UiButton
                    span
                    variant={UiButtonVariant.transparent}
                    label={Icon.xMark}
                    modifier={UiButtonModifier.block}
                  />
                </Flyout>
              </Field>
            </UiGrid.Span>
            {["commonSecret", "secret"].includes(value.type) && (
              <>
                <UiGrid.Span span={[1, value.type === "secret" ? 12 : 16]}>
                  <Field
                    name={`${name}.secretTopic`}
                    label={t("field.rounds.questions.secretTopic.label")}
                  >
                    <UiInput size={UiFieldSize.small} />
                  </Field>
                </UiGrid.Span>
                {value.type === "secret" && (
                  <UiGrid.Span span={[13, 4]}>
                    <Field
                      name={`${name}.secretCost`}
                      label={t("field.rounds.questions.secretCost.label")}
                    >
                      <UiInput
                        htmlType={UiInputType.number}
                        min={0}
                        step={1}
                        size={UiFieldSize.small}
                      />
                    </Field>
                  </UiGrid.Span>
                )}
              </>
            )}
            {value.type === "commonSecret" && (
              <>
                <UiGrid.Span span={[1, 3]}>
                  <Field
                    name={`${name}.selfSecret`}
                    label={t("field.rounds.questions.selfSecret.label")}
                    fixedSize={32}
                    valuePropName="checked"
                  >
                    <UiCheckbox
                      label={t("field.rounds.questions.selfSecret.placeholder")}
                    />
                  </Field>
                </UiGrid.Span>
                <UiGrid.Span span={[4, 3]}>
                  <Field
                    name={`${name}.commonSecretCostReveal`}
                    label={t(
                      "field.rounds.questions.commonSecretCostReveal.label",
                    )}
                  >
                    <UiSelect
                      options={revealOptions}
                      size={UiFieldSize.small}
                    />
                  </Field>
                </UiGrid.Span>
                <UiGrid.Span
                  span={[7, value.secretCostType === "minMax" ? 10 : 4]}
                >
                  <Field
                    name={`${name}.secretCostType`}
                    label={t("field.rounds.questions.secretCostType.label")}
                  >
                    <UiSelect
                      options={secretCostTypesOptions}
                      size={UiFieldSize.small}
                    />
                  </Field>
                </UiGrid.Span>
                {value.secretCostType === "fixed" && (
                  <UiGrid.Span span={[11, 6]}>
                    <Field
                      name={`${name}.secretCost`}
                      label={t("field.rounds.questions.secretCost.label")}
                    >
                      <UiInput
                        htmlType={UiInputType.number}
                        min={0}
                        step={1}
                        size={UiFieldSize.small}
                      />
                    </Field>
                  </UiGrid.Span>
                )}
                {value.secretCostType === "customMinMax" && (
                  <>
                    <UiGrid.Span span={[11, 2]}>
                      <Field
                        name={`${name}.secretMinMaxCost.0`}
                        label={t(
                          "field.rounds.questions.secretMinMaxCost.min.label",
                        )}
                      >
                        <UiInput
                          htmlType={UiInputType.number}
                          min={0}
                          step={1}
                          size={UiFieldSize.small}
                        />
                      </Field>
                    </UiGrid.Span>
                    <UiGrid.Span span={[13, 2]}>
                      <Field
                        name={`${name}.secretMinMaxCost.1`}
                        label={t(
                          "field.rounds.questions.secretMinMaxCost.max.label",
                        )}
                      >
                        <UiInput
                          htmlType={UiInputType.number}
                          min={0}
                          step={1}
                          size={UiFieldSize.small}
                        />
                      </Field>
                    </UiGrid.Span>
                    <UiGrid.Span span={[15, 2]}>
                      <Field
                        name={`${name}.secretMinMaxCost.2`}
                        label={t(
                          "field.rounds.questions.secretMinMaxCost.step.label",
                        )}
                      >
                        <UiInput
                          htmlType={UiInputType.number}
                          min={0}
                          step={1}
                          size={UiFieldSize.small}
                        />
                      </Field>
                    </UiGrid.Span>
                  </>
                )}
              </>
            )}
            <UiGrid.Span span={[1, 16]}>
              <Field
                name={`${name}.text`}
                label={t("field.rounds.questions.text.label")}
              >
                <UiInput
                  size={UiFieldSize.small}
                  htmlType={UiInputType.textarea}
                  rows={5}
                />
              </Field>
            </UiGrid.Span>
            <UiGrid.Span span={[1, 16]}>
              <Field
                name={`${name}.answers`}
                label={t("field.rounds.questions.answers.label")}
              >
                <TagInput
                  placeholder={t("field.rounds.questions.answers.placeholder")}
                />
              </Field>
            </UiGrid.Span>
            <UiGrid.Span span={[1, 16]}>
              <UiGrid columns={6} gutter={10}>
                {value.medias.map(({ key, ...media }, i) => (
                  <Flyout
                    key={key}
                    flyout={
                      media.type === "image" ? undefined : (
                        <UiTooltip style={{ maxWidth: "200px" }}>
                          <UiGrid columns={2} gutter={10}>
                            <UiGrid.Span span={[1, 1]}>
                              <Field
                                name={`${name}.medias.${i}.from`}
                                label={t(
                                  "field.rounds.questions.medias.from.label",
                                )}
                              >
                                <UiInput
                                  htmlType={UiInputType.number}
                                  min={0}
                                />
                              </Field>
                            </UiGrid.Span>
                            <UiGrid.Span span={[2, 1]}>
                              <Field
                                name={`${name}.medias.${i}.to`}
                                label={t(
                                  "field.rounds.questions.medias.to.label",
                                )}
                              >
                                <UiInput
                                  min={0}
                                  htmlType={UiInputType.number}
                                />
                              </Field>
                            </UiGrid.Span>
                          </UiGrid>
                        </UiTooltip>
                      )
                    }
                    options={{ placement: "top", offset: [0, -10] }}
                    delay={0}
                  >
                    <HasError name={`${name}.medias.${i}`}>
                      <FormMediaPreview
                        {...media}
                        onRemove={removeMedia(key)}
                        onUpload={setMedia(key)}
                      />
                    </HasError>
                  </Flyout>
                ))}
              </UiGrid>
            </UiGrid.Span>
            <UiGrid.Span span={[1, 16]}>
              <UiDropZone
                label={t("addMedia.label")}
                hint={t("addMedia.hint")}
                icon={Icon.cloudArrowUp}
                onChange={uploadMedias}
                accept={["image/*", "video/*", "audio/*"]}
                multiple
              />
            </UiGrid.Span>
          </UiGrid>
        </UiHoverCard>
      </UiGrid.Span>
    );
  },
);

export type JeopardyQuestionsFormProps = {
  items: Array<CreateJeopardyPackInput["rounds"][number]["questions"][number]>;
  t: TFunction;
  name: string;
  removeQuestion(index: number): () => void;
  style?: CSSProperties;
};

export const JeopardyQuestionsForm =
  SortableContainer<JeopardyQuestionsFormProps>(
    ({ items, name, t, removeQuestion, style }: JeopardyQuestionsFormProps) => (
      <UiGrid style={style} gutter={10}>
        {items.map((value, index) => (
          <JeopardyQuestionForm
            key={`item-${value.key}`}
            name={`${name}.questions.${index}`}
            t={t}
            index={index}
            value={value}
            remove={removeQuestion(index)}
          />
        ))}
      </UiGrid>
    ),
  );
