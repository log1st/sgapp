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
  const handleClick = () => {
    onChange?.({
      target: {
        name,
        value,
        checked: !checked,
      },
    });
  };

  return (
    <UiPureButton
      onClick={handleClick}
      disabled={disabled}
      data-e2e={e2e}
      style={style}
      className={clsx([
        styles.root,
        className,
        checked && styles.checked,
        disabled && styles.disabled,
        styles[`${size}Size`],
      ])}
    />
  );
}
