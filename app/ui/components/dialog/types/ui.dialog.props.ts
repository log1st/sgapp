import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { ArrayFrom } from "@/utils";
import { UiActiveActionConfig } from "../../active-actions";

export type UiDialogProps<Entity> = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;

  header?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  extended?: boolean;
  record?: Entity;
  actions?: ArrayFrom<UiActiveActionConfig<Entity>>;
  overflow?: boolean;
}>;
