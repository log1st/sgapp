"use client";

/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-argument */
import { useToggle } from "react-use";
import {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  SyntheticEvent,
} from "react";
import { createPortal } from "react-dom";
import { useOnClickOutside } from "next/dist/client/components/react-dev-overlay/internal/hooks/use-on-click-outside";
import {
  arrayFrom,
  clsx,
  contains,
  filteredArray,
  getRecordDataIndex,
} from "@/utils";
import { RichOption, UiSelectProps, UiSelectRenderer } from "..";

import styles from "./ui.select.module.scss";
import { UiField, UiFieldModifier } from "../../field";
import { Icon, UiIcon } from "../../icon";
import {
  UiFlyout,
  UiFlyoutContent,
  UiFlyoutContentType,
  UiFlyoutRow,
} from "../../flyout";
import { useFlyout } from "@/ui/hooks/useFlyout";
import { UiInput } from "@/ui/components/input";
import { UiActiveActions } from "@/ui/components/active-actions";
import { UiButtonVariant } from "@/ui/components/button";

export function UiSelect<
  Option extends Record<string, unknown>,
  Value,
  Multiple extends boolean = false,
>({
  className,
  style,
  e2e,
  name,
  valueIndex = "value",
  hintIndex = "hint",
  onChange,
  options,
  renderOption,
  clearValue,
  clearable,
  value,
  placement = "bottom",
  autoFocus = false,
  before,
  after,
  renderDisplayValue,
  placeholder,
  displayIndex = "label",
  multiple,
  tabIndex = 0,

  query,
  onQueryChange,
  queryPlaceholder,
  loading = false,
  page = 1,
  onPageChange,
  totalPages = 0,

  ...fieldProps
}: UiSelectProps<Option, Value, Multiple>) {
  const handleChange = (val: Multiple extends true ? Array<Value> : Value) => {
    if (fieldProps.disabled || fieldProps.readOnly) {
      return;
    }
    onChange?.({
      target: {
        name,
        value: val,
      },
    });
  };

  const [focused, setFocused] = useToggle(autoFocus);

  const computedOptions = new Map<any, RichOption<Value, Option>>(
    options?.map((option) => {
      const val = getRecordDataIndex(option, valueIndex) as unknown as Value;

      return [
        val,
        {
          value: val,
          label:
            renderOption?.(option) ?? getRecordDataIndex(option, displayIndex),
          option,
          selected: multiple ? (value as Value[]).includes(val) : value === val,
          hint: getRecordDataIndex(option, hintIndex),
        },
      ];
    }),
  );

  const renderRenderer = (
    renderer: UiSelectRenderer<Value, Option, Multiple>,
  ) =>
    renderer instanceof Function
      ? renderer({
          value: value as any,
          options: Array.from(computedOptions.values()).filter(
            (i) => i.selected,
          ),
          focused,
          iconProps: {
            className: styles.icon,
          },
        })
      : renderer;

  const displayValue =
    renderDisplayValue?.(
      value as any,
      ...filteredArray(
        arrayFrom(value).map((val) => computedOptions.get(val)?.option),
      ),
    ) ??
    (multiple
      ? filteredArray(
          arrayFrom(value).map((val) => computedOptions.get(val)?.label),
        ).join(", ")
      : computedOptions.get(value)?.label ?? String(value || ""));

  const handleOptionClick = (newValue: Value) => () => {
    if (multiple) {
      handleChange(
        (arrayFrom(value).includes(newValue as any)
          ? arrayFrom(value).toSpliced(
              arrayFrom(value).findIndex((v) => v === newValue),
              1,
            )
          : [...arrayFrom(value), newValue]) as Multiple extends true
          ? Array<Value>
          : Value,
      );
      return;
    }
    handleChange(newValue as any);
    setFocused(false);
  };

  const {
    popperStyles,
    setPopperElement,
    setReferenceElement,
    portalTarget,
    attributes,
    popperElement,
  } = useFlyout({ placement });

  const focus = () => {
    setFocused(true);
  };

  const blur: FocusEventHandler = (event) => {
    if (!popperElement) {
      return;
    }
    if (contains(popperElement, event.relatedTarget)) {
      return;
    }
    setFocused(false);
    fieldProps.onBlur?.({
      target: {
        name,
      },
    } as any);
  };

  const prevent = (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const clear: MouseEventHandler = (event) => {
    prevent(event);
    handleChange(clearValue as Multiple extends true ? Array<Value> : Value);
    setFocused(false);
  };

  const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onQueryChange?.(event.target.value);
  };

  const handlePage =
    (newPage: number): MouseEventHandler =>
    () => {
      onPageChange?.(Math.min(Math.max(newPage, 0), totalPages));
    };

  useOnClickOutside(popperElement, () => {
    setFocused(false);
  });

  return (
    <>
      <div className={styles.trigger} ref={setReferenceElement}>
        <UiField
          data-e2e={e2e}
          style={style}
          className={clsx([
            styles.root,
            className,
            fieldProps.disabled && styles.disabled,
          ])}
          {...fieldProps}
          action={
            clearable &&
            value !== clearValue &&
            typeof value !== "undefined" && (
              <div
                className={styles.clear}
                onClickCapture={clear}
                onMouseDownCapture={prevent}
              >
                <UiIcon icon={Icon.xMarkMini} className={styles.icon} />
              </div>
            )
          }
          after={
            after
              ? renderRenderer(after)
              : focused
              ? Icon.chevronDownUp
              : Icon.chevronUpDown
          }
          before={renderRenderer(before)}
          tabIndex={focused ? tabIndex : 0}
          onBlur={blur}
          onFocus={focus}
        >
          {displayValue ? (
            <div className={styles.value}>{displayValue}</div>
          ) : (
            <div className={styles.placeholder}>{placeholder}</div>
          )}
        </UiField>
      </div>
      {focused &&
        portalTarget.current &&
        createPortal(
          <div
            style={popperStyles.popper}
            ref={setPopperElement}
            {...attributes.popper}
            tabIndex={0}
            role="menuitem"
            onBlur={blur}
          >
            <UiFlyout className={styles.dropdown}>
              {typeof query === "string" && (
                <UiFlyoutRow
                  span
                  icon={Icon.magnifyingGlassMini}
                  interactive={false}
                  className={styles.query}
                >
                  <UiInput
                    placeholder={queryPlaceholder}
                    value={query}
                    autoFocus
                    onChange={handleQueryChange}
                    modifier={UiFieldModifier.noElevation}
                  />
                </UiFlyoutRow>
              )}
              {loading && (
                <UiFlyoutContent type={UiFlyoutContentType.loader}>
                  <UiIcon icon={Icon.spinner} size={20} spin />
                </UiFlyoutContent>
              )}
              {totalPages > 1 && !loading && (
                <UiFlyoutContent type={UiFlyoutContentType.loader}>
                  <UiActiveActions
                    actions={[
                      {
                        key: "previous",
                        label: Icon.arrowLongLeft,
                        variant: UiButtonVariant.secondary,
                        disabled: page <= 1,
                        onClick: handlePage(page - 1),
                      },
                      {
                        key: "next",
                        label: Icon.arrowLongRight,
                        variant: UiButtonVariant.secondary,
                        disabled: page >= totalPages,
                        onClick: handlePage(page + 1),
                      },
                    ]}
                  />
                </UiFlyoutContent>
              )}
              {Array.from(computedOptions.values()).map((option) => (
                <UiFlyoutRow
                  key={option.value as any}
                  label={option.label}
                  checked={option.selected}
                  radio={!multiple}
                  onClick={handleOptionClick(option.value)}
                  tabIndex={0}
                  hint={option.hint}
                />
              ))}
            </UiFlyout>
          </div>,
          portalTarget.current,
        )}
    </>
  );
}
