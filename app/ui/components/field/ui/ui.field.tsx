import { arrayFrom, clsx, filteredArray } from "@/utils";
import { UiFieldProps, UiFieldSize, UiFieldType } from "..";

import styles from "./ui.field.module.scss";
import { Icon, UiIcon } from "../../icon";
import { NodeOrIcon } from "@/app/ui/utils/nodeOrIcon";

export function UiField({
  className,
  style,
  e2e,
  before,
  type = UiFieldType.primary,
  size = UiFieldSize.base,
  children,
  readOnly,
  disabled,
  onBlur,
  onFocus,
  after,
  focused,
  touched,
  hasError,
  loading,
  tabIndex,
  action,
  modifier,
  div,
}: UiFieldProps) {
  const handleFocus: typeof onFocus = (event) => {
    if (disabled || readOnly) {
      return;
    }
    onFocus?.(event);
  };

  const Tag: any = div ? "div" : "label";

  return (
    <Tag
      data-e2e={e2e}
      style={style}
      className={clsx([
        styles.root,
        className,
        styles[`${type}Type`],
        styles[`${size}Size`],
        readOnly && styles.readOnly,
        disabled && styles.disabled,
        focused && styles.focused,
        touched && styles.touched,
        hasError && styles.hasError,
        ...filteredArray(arrayFrom(modifier)).map(
          (m) => styles[`${m}Modifier`],
        ),
      ])}
      tabIndex={tabIndex}
      onFocus={handleFocus}
      onBlur={onBlur}
    >
      <NodeOrIcon className={styles.before} iconClassName={styles.icon}>
        {before}
      </NodeOrIcon>
      <div className={styles.content}>{children}</div>
      <NodeOrIcon className={styles.after} iconClassName={styles.icon}>
        {loading ? (
          <UiIcon icon={Icon.spinner} spin className={styles.loader} />
        ) : (
          after
        )}
      </NodeOrIcon>
      {action && <div className={styles.action}>{action}</div>}
    </Tag>
  );
}
