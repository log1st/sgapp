import { clsx, arrayFrom } from "@/utils";
import { UiProgressTabsGroupProps } from "..";

import styles from "./ui.progress-tabs-group.module.scss";
import { UiProgressTab } from "../../../components/progress-tab";

export function UiProgressTabsGroup({
  className,
  style,
  e2e,
  tabs,
  children,
}: UiProgressTabsGroupProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      {children ||
        (tabs
          ? arrayFrom(tabs).map(({ key, ...tab }) => (
              <UiProgressTab key={key} {...tab} className={styles.tab} />
            ))
          : null)}
    </div>
  );
}
