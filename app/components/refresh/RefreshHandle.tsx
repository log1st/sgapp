"use client";

import { useTimeoutFn } from "react-use";
import { refreshTokenAction } from "@/app/api/auth/refreshTokenAction";

export type RefreshHandleProps = {
  refreshAt: Date;
};

export function RefreshHandle({ refreshAt }: RefreshHandleProps) {
  const timeout = Math.max(+refreshAt - Date.now() - 15 * 1000, 3000);

  useTimeoutFn(refreshTokenAction, timeout);

  return null;
}
