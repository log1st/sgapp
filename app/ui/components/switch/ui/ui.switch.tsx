import { clsx } from "@clsx";
import { UiSwitchProps, UiSwitchSize } from "..";

import styles from "./ui.switch.module.scss";
import { UiPureButton } from "../../pure-button";

export function UiSwitch({
  className,
  style,
  e2e,
  checked,
  value,
  onChange,
  name,
  disabled,
  size = UiSwitchSize.base,
}: UiSwitchProps) {
  const handleClick: typeof onChange = (event) => {
    if (disabled) {
      return;
    }
    onChange?.(event);
  };

  return (
    <div
      className={clsx([styles.wrapper, className])}
      data-e2e={e2e}
      style={style}
    >
      <UiPureButton
        disabled={disabled}
        span="label"
        className={clsx([
          styles.root,
          checked && styles.checked,
          disabled && styles.disabled,
          styles[`${size}Size`],
        ])}
      >
        <input
          checked={checked}
          value={value}
          onChange={handleClick}
          name={name}
          type="checkbox"
          className={styles.input}
        />
      </UiPureButton>
    </div>
  );
}
