import { Children, cloneElement, isValidElement } from "react";
import { getSessionTheme } from "@/theming/getSessionTheme";

export const withTheme = (children: any) =>
  Children.map(children, (child) =>
    isValidElement(child)
      ? cloneElement(child, {
          theme: getSessionTheme(),
        } as any)
      : child,
  );
