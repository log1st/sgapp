import { arrayFrom, clsx } from "@/utils";
import {
  UiDatePickerPreset,
  UiDatePickerProps,
} from "../../types/ui.date-picker.props";
import styles from "../ui.date-picker.module.scss";
import { UiPureButton } from "../../../pure-button";

export type PresetsProps = Pick<
  UiDatePickerProps<boolean>,
  "preset" | "presets"
> & {
  handlePreset?(preset: UiDatePickerPreset): () => void;
};

export function Presets({ presets, preset, handlePreset }: PresetsProps) {
  return presets ? (
    <div className={styles.presets}>
      {arrayFrom(presets).map((item) => (
        <UiPureButton
          key={item.key}
          className={clsx([
            styles.preset,
            preset === item.key && styles.active,
          ])}
          onClick={handlePreset?.(item)}
        >
          {item.label}
        </UiPureButton>
      ))}
    </div>
  ) : null;
}
