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
import { useForm } from "@/app/components/form";

type RoundTabProps = {
  value: CreateJeopardyPackInput["rounds"][number];
};

const DragHandle = SortableHandle<UiIconProps>(
  forwardRef<HTMLDivElement>((props, ref) => (
    <div ref={ref}>
      <UiIcon {...(props as UiIconProps)} />
    </div>
  )),
);

function RoundTab({ value }: RoundTabProps) {
  const { state, setState } = useForm<{ round: string }>();

  const setCurrentRoute = () => {
    setState("round", value.key);
  };

  return (
    <UiProgressTab
      selected={state.round === value.key}
      icon={<DragHandle icon={Icon.barsThree} size={16} />}
      onClick={setCurrentRoute}
    >
      {value.name}
    </UiProgressTab>
  );
}

const JeopardyPackRoundTab = SortableElement<RoundTabProps>(RoundTab);

type RoundTabsProps = {
  items: Array<RoundTabProps["value"]>;
  t: TFunction;
  addRound?(): void;
};

function RoundTabs({ items, addRound }: RoundTabsProps) {
  return (
    <UiProgressTabsGroup>
      {items.map((value, index) => (
        <JeopardyPackRoundTab
          value={value}
          index={index}
          key={`item-${value.key}`}
        />
      ))}
      <UiProgressTab icon={Icon.plus} onClick={addRound} />
    </UiProgressTabsGroup>
  );
}

export const JeopardyPackRoundTabs =
  SortableContainer<RoundTabsProps>(RoundTabs);
