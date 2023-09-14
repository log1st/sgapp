"use client";

import {
  FocusEventHandler,
  PropsWithChildren,
  ReactNode,
  FocusEvent,
  forwardRef,
} from "react";
import { createPortal } from "react-dom";
import { useTimeoutFn, useToggle } from "react-use";
import { useFlyout, UseFlyoutOptions } from "@/ui/hooks/useFlyout";
import { contains } from "@/utils";
import { UiPureButton } from "@/ui/components/pure-button";

export type FlyoutProps = PropsWithChildren<{
  flyout?: ReactNode;
  options?: UseFlyoutOptions;
  delay?: number;
}>;

const Trigger = forwardRef(UiPureButton);

export default function Flyout({
  children,
  flyout,
  options = {
    sameWidth: false,
  },
  delay = 350,
}: FlyoutProps) {
  const {
    popperElement,
    referenceElement,
    setPopperElement,
    setReferenceElement,
    portalTarget,
    popperStyles,
    attributes,
  } = useFlyout(options);

  const [active, toggleActive] = useToggle(false);

  const close = (event?: FocusEvent) => {
    if (
      event &&
      (contains(popperElement, event.relatedTarget) ||
        contains(referenceElement, event.relatedTarget))
    ) {
      return;
    }

    toggleActive(false);
  };

  const [, cancel, reset] = useTimeoutFn(close, delay);

  const focus = () => {
    cancel();
    toggleActive(true);
  };

  const blur: FocusEventHandler = (event) => {
    close(event);
  };

  const instantClose = () => {
    cancel();
    toggleActive(false);
  };

  return (
    <>
      <Trigger
        onMouseOver={focus}
        onFocus={focus}
        onBlur={close}
        onMouseLeave={reset}
        ref={setReferenceElement}
      >
        {children}
      </Trigger>
      {active &&
        portalTarget.current &&
        createPortal(
          <div
            style={popperStyles.popper}
            ref={setPopperElement}
            {...attributes.popper}
            onMouseOver={focus}
            onFocus={focus}
            onBlur={blur}
            onMouseLeave={instantClose}
          >
            {flyout}
          </div>,
          portalTarget.current,
        )}
    </>
  );
}
