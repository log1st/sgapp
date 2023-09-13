import { CSSProperties, MouseEvent, ReactNode } from "react";
import { ArrayFrom, Keyed } from "@/utils";
import { Icon } from "../../icon";
import { UiBadgeProps } from "../../badge";

export type UiCodeBlockContent = {
  label: ReactNode;
  content: ReactNode;
};

export type UiCodeBlockAction = {
  icon: Icon;
  onClick?(
    pill: UiCodeBlockContent | undefined,
    event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void;
};

export enum UiCodeBlockTheme {
  loud = "loud",
  subtle = "subtle",
}

export enum UiCodeBlockType {
  simple = "simple",
  advanced = "advanced",
}

export type UiCodeBlockProps = {
  style?: CSSProperties;
  className?: string;
  e2e?: string;

  theme?: UiCodeBlockTheme;
  type?: UiCodeBlockType;
  badge?: UiBadgeProps;
  title?: ReactNode;
  contents?: ArrayFrom<Keyed<UiCodeBlockContent>>;
  actions?: ArrayFrom<Keyed<UiCodeBlockAction>>;
};
