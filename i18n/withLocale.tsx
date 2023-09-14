import { Children, cloneElement, isValidElement } from "react";
import { getSessionLanguage } from "@/i18n/getSessionLanguage";

export const withLocale = (children: any) =>
  Children.map(children, (child) =>
    isValidElement(child)
      ? cloneElement(child, {
          lng: getSessionLanguage(),
        } as any)
      : child,
  );
