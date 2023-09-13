import { clsx } from "@clsx";
import {
  Children,
  cloneElement,
  FC,
  forwardRef,
  isValidElement,
  Ref,
  useId,
} from "react";
import { UiResponsiveUtilProps } from "../index";

import styles from "./ui.responsive-util.module.scss";

export const withResponsiveUtil = <
  Props extends {
    className?: string;
    [key: string]: unknown;
  },
>(
  Component: FC<Props>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...rules: Array<
    Pick<
      UiResponsiveUtilProps,
      "mobile" | "tablet" | "desktop" | "wider" | "tighter"
    >
  >
) =>
  function HOCComponent({ className, ...props }: Props) {
    const id = ["responsive", useId().replace(/:/g, "")];
    const T: any = Component;

    return (
      <>
        <T {...props} className={clsx([className, ...id])} />
        <style>{`
          .${id.join(".")} {
            cursor: all-scroll;
          }
        `}</style>
      </>
    );
  };

export const UiResponsiveUtil = forwardRef(
  (
    {
      children,
      tablet,
      mobile,
      desktop,
      wider,
      tighter,
      wrap = false,
      false: falsy,
      true: truly,
      className: cls,
      ...props
    }: UiResponsiveUtilProps,
    ref: Ref<any>,
  ) => {
    const className = clsx([
      styles.root,
      cls,
      mobile && styles.mobile,
      tablet && styles.tablet,
      desktop && styles.desktop,
      wider && styles.wider,
      tighter && styles.tighter,
      truly === true && styles.visible,
      falsy === true && styles.hidden,
    ]);

    if (wrap) {
      return <div className={className}>{children}</div>;
    }

    return Children.map(children, (child) =>
      isValidElement(child) ? (
        cloneElement(child, {
          ...props,
          className: clsx([child.props.className, className]),
          ref,
        } as any)
      ) : (
        <span ref={ref} className={clsx([className, styles.text])}>
          {child}
        </span>
      ),
    );
  },
);
