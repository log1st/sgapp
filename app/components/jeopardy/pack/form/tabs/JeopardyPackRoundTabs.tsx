import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { TFunction } from "i18next";
import { forwardRef } from "react";
import { CreateJeopardyPackInput } from "@/api";
import { UiProgressTab } from "@/ui/components/progress-tab";
import { UiProgressTabsGroup } from "@/ui/layouts/progress-tabs-group";
import { Icon, UiIcon, UiIconProps } from "@/ui/components/icon";
import { HasError, useForm } from "@/app/components/form";
import Flyout, { FlyoutTrigger } from "@/app/components/flyout/Flyout";
import { UiTooltip } from "@/ui/components/tooltip";
import { UiButtonVariant } from "@/ui/components/button";

type RoundTabProps = {
  value: CreateJeopardyPackInput["rounds"][number];
  remove?(): void;
  name: string;
  t: TFunction;
};

const DragHandle = SortableHandle<UiIconProps>(
  forwardRef<HTMLDivElement>((props, ref) => (
    <div ref={ref}>
      <UiIcon {...(props as UiIconProps)} />
    </div>
  )),
);

function RoundTab({ value, remove, t, name }: RoundTabProps) {
  const { state, setState } = useForm<{ round: string }>();

  const setCurrentRoute = () => {
    setState("round", value.key);
  };

  return (
    <HasError name={name}>
      <UiProgressTab
        selected={state.round === value.key}
        icon={<DragHandle icon={Icon.barsThree} size={16} />}
        onClick={setCurrentRoute}
        span
        after={
          remove ? (
            <Flyout
              interactive
              trigger={FlyoutTrigger.click}
              flyout={
                <UiTooltip
                  label={t("action.removeRound.hint")}
                  action={[
                    {
                      key: "confirm",
                      label: t("action.removeRound.action"),
                      variant: UiButtonVariant.danger,
                      onClick: remove,
                    },
                  ]}
                />
              }
              options={{ placement: "top" }}
            >
              <UiIcon icon={Icon.xMark} size={16} />
            </Flyout>
          ) : null
        }
      >
        {value.name}
      </UiProgressTab>
    </HasError>
  );
}

const JeopardyPackRoundTab = SortableElement<RoundTabProps>(RoundTab);

type RoundTabsProps = {
  items: Array<RoundTabProps["value"]>;
  t: TFunction;
  addRound?(): void;
  removeRound?(index: number): () => void;
};

function RoundTabs({ items, addRound, removeRound, t }: RoundTabsProps) {
  return (
    <UiProgressTabsGroup>
      {items.map((value, index) => (
        <JeopardyPackRoundTab
          value={value}
          index={index}
          key={`item-${value.key}`}
          name={`rounds.${index}`}
          remove={removeRound?.(index)}
          t={t}
        />
      ))}
      <UiProgressTab icon={Icon.plus} onClick={addRound} />
    </UiProgressTabsGroup>
  );
}

export const JeopardyPackRoundTabs =
  SortableContainer<RoundTabsProps>(RoundTabs);
