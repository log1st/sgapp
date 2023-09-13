"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
} from "react";
import { UiScrollbarProps } from "../index";

import styles from "./ui.scrollbar.module.scss";

export function UiScrollbar({ className, style, children }: UiScrollbarProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = document.createElement("div");
    bar.classList.add(styles.root);

    ref.current?.appendChild(bar);

    const onScroll = () => {
      requestAnimationFrame(() => {
        if (!ref.current || !ref.current?.children[0]) {
          return;
        }

        const { clientHeight, scrollHeight, scrollTop } = ref.current;

        const height = (clientHeight / scrollHeight) * 100;

        // @TODO
        const top = (1 - scrollTop / clientHeight) * 100;

        bar.style.setProperty("top", `${top}%`);
        bar.style.setProperty("height", `${height}%`);
        bar.classList[scrollHeight > clientHeight ? "add" : "remove"](
          styles.active,
        );
      });
    };

    onScroll();

    ref.current?.addEventListener("scroll", onScroll);

    const resizeObserver = new ResizeObserver(onScroll);

    const mutationObserver = new MutationObserver(onScroll);

    if (ref.current) {
      resizeObserver.observe(ref.current);
      mutationObserver.observe(ref.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      ref.current?.removeEventListener("scroll", onScroll);

      resizeObserver.disconnect();
      mutationObserver.disconnect();

      bar.remove();
    };
  }, [ref.current]);

  return isValidElement(children)
    ? Children.map(children, (child) =>
        cloneElement(child, {
          ref,
          className,
          style,
        } as any),
      )
    : children;
}
