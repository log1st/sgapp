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

export enum FlyoutTrigger {
  click = "click",
  hover = "hover",
}

export type FlyoutProps = PropsWithChildren<{
  flyout?: ReactNode;
  options?: UseFlyoutOptions;
  delay?: number;
  trigger?: FlyoutTrigger;
  interactive?: boolean;
  span?: boolean;
}>;

const Trigger = forwardRef(UiPureButton);

export default function Flyout({
  children,
  flyout,
  options = {
    sameWidth: false,
  },
  delay = 350,
  trigger = FlyoutTrigger.hover,
  interactive = false,
  span = false,
}: FlyoutProps) {
  const { placement, sameWidth, offset } = { sameWidth: false, ...options };

  const {
    popperElement,
    referenceElement,
    setPopperElement,
    setReferenceElement,
    portalTarget,
    popperStyles,
    attributes,
  } = useFlyout({ placement, sameWidth, offset });

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
        onMouseOver={trigger === FlyoutTrigger.hover ? focus : undefined}
        onClick={trigger === FlyoutTrigger.click ? focus : undefined}
        onFocus={focus}
        onBlur={close}
        onMouseLeave={trigger === FlyoutTrigger.hover ? reset : undefined}
        ref={setReferenceElement}
        interactive={interactive}
        stop
        span={span}
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
