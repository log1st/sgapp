import { useState } from "react";
import { arrayFrom, clsx, formatDate, Keyed } from "@/utils";
import {
  UiDatePickerLevel,
  UiDatePickerPreset,
  UiDatePickerProps,
  UiDatePickerTexts,
} from "..";

import styles from "./ui.date-picker.module.scss";
import { Presets } from "./parts/Presets";
import { UiButton, UiButtonVariant } from "../../button";
import { Calendar } from "./parts/Calendar";

const defaultTexts: Record<string, UiDatePickerTexts> = {
  en: {
    cancel: "Cancel",
    apply: "Apply",
    range: "Range:",
    end: "End:",
    start: "Start:",
  },
};

export function UiDatePicker<Range extends boolean = false>({
  className,
  style,
  e2e,
  min,
  onChange,
  max,
  name,
  locale = "en",
  preset,
  presets,
  time,
  level = UiDatePickerLevel.day,
  value: val,
  range = Array.isArray(val) as Range,
  onCancel,
  texts = defaultTexts[locale],
}: UiDatePickerProps<Range>) {
  const [value, setValue] = useState(val);

  const handlePreset = (newPreset: Keyed<UiDatePickerPreset>) => () => {
    onChange?.({
      target: {
        value,
        name,
        preset: newPreset.key,
      },
    });
  };

  const handleSubmit = () => {
    onChange?.({
      target: {
        value,
        name,
        preset,
      },
    });
  };

  const handleFirstCalendar = (date: Date) => {
    if (Array.isArray(value)) {
      setValue([date, value[1]] as typeof value);
      return;
    }
    setValue(date as typeof value);
  };

  const handleSecondCalendar = (date: Date) => {
    if (Array.isArray(value)) {
      setValue([value[0], date] as typeof value);
      return;
    }
    setValue([date, date] as typeof value);
  };

  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      <Presets presets={presets} handlePreset={handlePreset} preset={preset} />
      <div className={styles.content}>
        <div className={styles.pickers}>
          <Calendar
            locale={locale}
            level={level}
            value={arrayFrom(value)[0]}
            range={Array.isArray(value) ? value : [value, value]}
            className={styles.picker}
            min={min}
            max={arrayFrom(value)[1]}
            onChange={handleFirstCalendar}
          />
          {range && (
            <Calendar
              locale={locale}
              level={level}
              value={arrayFrom(value)[1]}
              range={Array.isArray(value) ? value : [value, value]}
              min={arrayFrom(value)[0]}
              max={max}
              className={styles.picker}
              onChange={handleSecondCalendar}
            />
          )}
        </div>
        {time && <div className={styles.times}>times</div>}
        <div className={styles.footer}>
          {range && (
            <div className={styles.range}>
              <span className={styles.rangeLabel}>{texts.range}</span>
              <span className={styles.rangeValues}>
                {arrayFrom(value)
                  .map((v) =>
                    formatDate(locale, v ?? null, {
                      month: "short",
                      year: "numeric",
                      day: "numeric",
                    }),
                  )
                  .join(" - ")}
              </span>
            </div>
          )}
          {!!onCancel && (
            <UiButton
              label={texts?.cancel}
              variant={UiButtonVariant.secondary}
              onClick={onCancel}
              className={styles.action}
            />
          )}
          <UiButton
            label={texts?.apply}
            variant={UiButtonVariant.primary}
            onClick={handleSubmit}
            className={styles.action}
          />
        </div>
      </div>
    </div>
  );
}
