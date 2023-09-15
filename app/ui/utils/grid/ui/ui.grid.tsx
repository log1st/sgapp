import { clsx } from "@clsx";
import {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
  PropsWithChildren,
} from "react";
import { UiGridProps } from "..";

import styles from "./ui.grid.module.scss";
import { arrayFrom } from "@/utils";

export type UiGridSpanProps = PropsWithChildren<{
  span?: [number, number];
  style?: CSSProperties;
}>;

function Span({ span = [1, 1], children, style }: UiGridSpanProps) {
  return Children.map(children, (child) =>
    isValidElement(child)
      ? cloneElement(child, {
          ...child.props,
          style: {
            ...style,
            ...(child.props.style || {}),
            gridColumn: `${span[0]} / span ${span[1]}`,
          },
        })
      : child,
  );
}

export function UiGrid({
  className,
  style,
  e2e,
  children,
  gutter,
  columns = 1,
  align,
}: UiGridProps) {
  return (
    <div
      data-e2e={e2e}
      style={{
        ...style,
        alignItems: align,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: [
          `${arrayFrom(gutter)[0]}px`,
          `${arrayFrom(gutter)[1] || arrayFrom(gutter)[0]}px`,
        ].join(" "),
      }}
      className={clsx([styles.root, className])}
    >
      {Children.map(children, (child) =>
        isValidElement(child) ? (
          child.type instanceof Span ? (
            cloneElement(child, {
              span: [1, columns],
              ...child.props,
            })
          ) : (
            <Span span={[1, columns]}>{child}</Span>
          )
        ) : (
          child
        ),
      )}
    </div>
  );
}

UiGrid.Span = Span;
