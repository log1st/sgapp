"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Modifier, PopperProps, usePopper } from "react-popper";
import { Options } from "@popperjs/core/lib/modifiers/offset";
import { filteredArray } from "@/utils";

export type UseFlyoutOptions = {
  offset?: Options["offset"];
  placement?: PopperProps<unknown>["placement"];
  sameWidth?: boolean;
};

export const useFlyout = ({
  offset = [0, 7],
  placement = "bottom",
  sameWidth = true,
}: UseFlyoutOptions = {}) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);

  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );

  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    useMemo<{
      modifiers: ReadonlyArray<Modifier<unknown>>;
    }>(
      () => ({
        modifiers: filteredArray([
          {
            name: "arrow",
            options: {
              element: arrowElement,
            },
          },
          {
            name: "offset",
            options: {
              offset,
            },
          },
          sameWidth && {
            name: "sameWidth",
            enabled: true,
            phase: "beforeWrite",
            requires: ["computeStyles"],
            fn: ({ state }) => {
              Object.assign(state.styles.popper, {
                minWidth: `${state.rects.reference.width}px`,
              });
            },
            effect: ({ state }) => {
              if (state.elements.reference instanceof HTMLElement) {
                Object.assign(state.elements.popper.style, {
                  minWidth: `${state.elements.reference.offsetWidth}px`,
                });
              }
            },
          },
        ]),
        placement,
        strategy: "fixed",
      }),
      [placement, sameWidth],
    ),
  );

  const portalTarget = useRef<HTMLDivElement | HTMLBodyElement | null>(null);
  useEffect(() => {
    portalTarget.current = document.querySelector<
      HTMLDivElement | HTMLBodyElement
    >("[data-app-popper]");
  }, []);

  return {
    popperElement,
    referenceElement,
    arrowElement,
    setReferenceElement,
    setPopperElement,
    setArrowElement,
    portalTarget,
    popperStyles,
    attributes,
  };
};
