"use client";

import React, {
  createContext,
  FC,
  Key,
  PropsWithChildren,
  useContext,
  useMemo,
  useRef,
} from "react";
import { Keyed, randomString } from "@/utils";

export enum DialogType {
  confirm = "confirm",
}

export type DialogParams<Type extends DialogType> = {
  [DialogType.confirm]: never;
}[Type];

export type DialogConfig<Type extends DialogType> = {
  type: Type | FC<DialogParams<Type>>;
} & (DialogParams<Type> extends never
  ? {}
  : {
      params: DialogParams<Type>;
    });

export type DialogsContextValues = {
  dialogs: Array<Keyed<DialogConfig<DialogType>>>;
  showDialog<Type extends DialogType>(config: DialogConfig<Type>): Key;
  hideDialogByKey(key: Key): void;
};

const DialogsContext = createContext<DialogsContextValues>({
  dialogs: [],
  showDialog: () => 1,
  hideDialogByKey: () => {},
});

export const useDialogs = () => useContext(DialogsContext);

export type DialogsProviderProps = PropsWithChildren;

export function DialogsProvider({ children }: DialogsProviderProps) {
  const dialogs = useRef<DialogsContextValues["dialogs"]>([]);

  const showDialog = <Type extends DialogType>(config: DialogConfig<Type>) => {
    const dialog: Keyed<DialogConfig<Type>> = {
      ...config,
      key: randomString(),
    };
    dialogs.current.push(dialog as any);
    return dialog.key;
  };

  const hideDialogByKey = (key: Key) => {
    const index = dialogs.current.findIndex((d) => d.key === key);
    if (index > -1) {
      dialogs.current.splice(index, 1);
    }
  };

  const value = useMemo<DialogsContextValues>(
    () => ({
      dialogs: dialogs.current,
      showDialog,
      hideDialogByKey,
    }),
    [dialogs.current, showDialog],
  );

  return (
    <DialogsContext.Provider value={value}>
        {children}
        {dialogs.current.map(dialog => (

        ))}
    </DialogsContext.Provider>
  );
}
