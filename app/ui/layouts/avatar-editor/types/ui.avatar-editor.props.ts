import { CSSProperties, PropsWithChildren, ReactNode } from "react";

export type UiAvatarEditorProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;
  action?: ReactNode;
  error?: ReactNode;
}>;
