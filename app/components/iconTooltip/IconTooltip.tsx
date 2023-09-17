import { PropsWithChildren, ReactNode } from "react";
import Flyout from "@/app/components/flyout/Flyout";
import { UiTooltip } from "@/ui/components/tooltip";
import { UiTypography, UiTypographyType } from "@/ui/utils/typography";
import { Icon, UiIcon } from "@/ui/components/icon";

type IconTooltipProps = PropsWithChildren<{ label?: ReactNode }>;

export default function IconTooltip({ label, children }: IconTooltipProps) {
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
