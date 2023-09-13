import { clsx, arrayFrom } from "@/utils";
import { UiPillsGroupProps } from "..";

import styles from "./ui.pills-group.module.scss";
import { UiPill } from "../../../components/pill";

export function UiPillsGroup({
  className,
  style,
  e2e,
  pills,
  children,
}: UiPillsGroupProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      {children ||
        (pills
          ? arrayFrom(pills).map(({ key, ...pill }) => (
              <UiPill key={key} {...pill} />
            ))
          : null)}
    </div>
  );
}
