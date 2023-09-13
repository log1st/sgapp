"use client";

import { useEffect } from "react";
import {
  DialogType,
  useDialogs,
} from "@/app/providers/dialogs/DialogsProvider";

export default function AuthSignInPage() {
  const { showDialog, hideDialogByKey } = useDialogs();
  useEffect(() => {
    const dialogKey = showDialog({
      type: DialogType.confirm,
    });

    return () => hideDialogByKey(dialogKey);
  }, []);
}
