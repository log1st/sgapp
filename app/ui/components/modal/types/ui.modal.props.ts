import { CSSProperties, PropsWithChildren } from "react";

export type UiModalProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;
  onBackdropClick?(): void;
}>;
