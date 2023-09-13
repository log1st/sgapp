"use client";

import { clsx } from "@clsx";
// eslint-disable-next-line import/no-extraneous-dependencies
import Link from "next/link";
import { UiPureButtonHtmlType, UiPureButtonProps } from "..";

import styles from "./ui.pure-button.module.scss";

export function UiPureButton({
  className,
  style,
  e2e,
  href,
  target,
  onClick,
  htmlType = UiPureButtonHtmlType.button,
  disabled = false,
  children,
  tabIndex,
  span,
  link,
  onMouseOver,
  onMouseLeave,
  onFocus,
  onBlur,
  active,
  interactive,
  prevent,
  stop,
}: UiPureButtonProps) {
  const handleOnClick: typeof onClick = (event) => {
    if (prevent) {
      event.preventDefault();
    }
    if (stop) {
      event.stopPropagation();
    }
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClick?.(event);
  };

  const finalClassName = clsx([
    className,
    interactive && styles.interactive,
    active && styles.active,
  ]);

  if (span) {
    if (span === "label") {
      return (
        <label data-e2e={e2e} style={style} className={finalClassName}>
          {children}
        </label>
      );
    }
    return (
      <div data-e2e={e2e} style={style} className={finalClassName}>
        {children}
      </div>
    );
  }

  if (link || href) {
    return (
      <Link
        data-e2e={e2e}
        href={href || "#"}
        target={target}
        className={finalClassName}
        onClick={handleOnClick}
        tabIndex={disabled ? -1 : tabIndex}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        style={style}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      className={finalClassName}
      disabled={disabled}
      data-e2e={e2e}
      type={htmlType}
      onClick={handleOnClick}
      style={style}
      tabIndex={disabled ? -1 : tabIndex}
    >
      {children}
    </button>
  );
}
