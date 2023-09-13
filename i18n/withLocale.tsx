import { Children, cloneElement, isValidElement, ReactElement } from "react";
import { getSessionLanguage } from "@/session/getSessionLanguage";

export const withLocale = (children: ReactElement<{ lng?: string }>) =>
  Children.map(children, (child) =>
    isValidElement(child)
      ? cloneElement(child, {
          lng: getSessionLanguage(),
        })
      : child,
  );
