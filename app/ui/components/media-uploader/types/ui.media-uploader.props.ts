import { CSSProperties } from "react";
import { Icon } from "@/ui/components/icon";

export type UiMediaUploaderProps = {
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;
  loading?: boolean;
  onCancel?(): void;
  preview?: string | null;
  hasError?: boolean;
  icon?: Icon;
};
