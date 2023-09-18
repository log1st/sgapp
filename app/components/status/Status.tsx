import { Key, ReactNode } from "react";
import { Placement } from "@popperjs/core";
import { UseFlyoutOptions } from "@/ui/hooks/useFlyout";
import { UiStatusLayout } from "@/ui/layouts/room-status-layout";
import Flyout from "@/app/components/flyout/Flyout";
import { UiTooltip } from "@/ui/components/tooltip";

export type StatusFlyout =
  | [Key, ReactNode]
  | [Key, ReactNode, ReactNode]
  | [Key, ReactNode, ReactNode, UseFlyoutOptions];

export type StatusProps = {
  flyOuts: Array<StatusFlyout>;
  placement?: Placement;
  span?: boolean;
};

export default function Status({
  flyOuts,
  placement = "top",
  span,
}: StatusProps) {
  return (
    <UiStatusLayout>
      {flyOuts.map(([key, trigger, tooltip, options]) => (
        <Flyout
          key={key}
          flyout={tooltip && <UiTooltip>{tooltip}</UiTooltip>}
          options={{
            ...options,
            placement: options?.placement ?? placement,
          }}
          delay={0}
          span={span}
        >
          {trigger}
        </Flyout>
      ))}
    </UiStatusLayout>
  );
}
