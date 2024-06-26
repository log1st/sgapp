import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { Icon } from "@/ui/components/icon";
import { ArrayFrom } from "@/utils";

export type DropZoneChangePayload = {
  target: {
    name?: string;
    value?: Array<File>;
  };
};

export type DropZoneChangeHandler = (payload: DropZoneChangePayload) => void;

export type UiDropZoneProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;

  label?: ReactNode;
  icon?: Icon | ReactNode;
  disabled?: boolean;
  value?: Array<File>;
  name?: string;
  onChange?: DropZoneChangeHandler;
  accept?: ArrayFrom<string>;
  multiple?: boolean;
  hint?: ReactNode;
  fetchData?(data: string | URL): Promise<{
    headers: {
      get(header: string): string | null;
    };
    blob(): Promise<Blob>;
  }>;
}>;
