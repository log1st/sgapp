"use client";

import { forwardRef, Ref, useEffect, useRef, useState } from "react";
import { UiVirtualScrollProps } from "../index";

import styles from "./ui.virtual-scroll.module.scss";

export const UiVirtualScroll = forwardRef(
  (
    {
      itemHeight,
      total,
      children,
      overScan = 0,
      onReachEnd,
    }: UiVirtualScrollProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const parentRef = useRef<HTMLDivElement | null>(null);

    const setParentRef = (node: HTMLDivElement) => {
      parentRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        // eslint-disable-next-line no-param-reassign
        (ref as any).current = node;
      }
    };

    const totalHeight = itemHeight * total;

    const [scrollTop, setScrollTop] = useState(0);
    const [offsetHeight, setOffsetHeight] = useState(0);

    useEffect(() => {
      if (!parentRef.current) {
        return () => {};
      }
      setScrollTop(parentRef.current.scrollTop);

      const onScroll = () => {
        if (!parentRef.current) {
          return;
        }
        requestAnimationFrame(() => {
          if (!parentRef.current) {
            return;
          }
          setScrollTop(parentRef.current.scrollTop);

          if (
            parentRef.current.scrollTop + parentRef.current.offsetHeight >
            parentRef.current.scrollHeight - 100
          ) {
            onReachEnd?.();
          }
        });
      };

      onScroll();
      parentRef.current.addEventListener("scroll", onScroll);

      const onResize = () => {
        if (!parentRef.current) {
          return;
        }

        setOffsetHeight(parentRef.current.offsetHeight);
        setScrollTop(parentRef.current.scrollTop);
      };

      const observer = new ResizeObserver(onResize);
      observer.observe(parentRef.current);

      return () => {
        parentRef.current?.removeEventListener("scroll", onScroll);
        observer.disconnect();
      };
    }, [parentRef.current, onReachEnd]);

    const firstItem = Math.max(
      Math.floor(scrollTop / itemHeight) - overScan,
      0,
    );
    const lastItem = Math.min(
      firstItem + Math.ceil(offsetHeight / itemHeight) + overScan * 2,
      total,
    );

    const itemsToRender = Array.from({ length: lastItem - firstItem }).map(
      (_, i) => firstItem + i,
    );

    return (
      <div className={styles.root} ref={setParentRef}>
        <div
          className={styles.wrapper}
          style={{
            blockSize: `${totalHeight}px`,
          }}
        >
          {itemsToRender.map((index) => (
            <div
              key={index}
              className={styles.item}
              style={{
                translate: `0 ${index * itemHeight}px`,
              }}
            >
              {children?.(index)}
            </div>
          ))}
        </div>
      </div>
    );
  },
);
