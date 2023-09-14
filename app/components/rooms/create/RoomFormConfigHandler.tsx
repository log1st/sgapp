"use client";

import { useFormikContext } from "formik";
import { useTimeoutFn, useToggle, useUpdateEffect } from "react-use";
import { CreateRoomInput } from "@/api";
import JeopardyConfigForm, {
  getJeopardyConfig,
} from "./jeopardy/JeopardyConfigForm";
import SixMindsConfigForm, {
  getSixMindsConfig,
} from "./sixMinds/SixMindsConfigForm";

export type RoomFormConfigHandlerProps = {
  lng?: string;
};

export function RoomFormConfigHandler({
  lng = "en",
}: RoomFormConfigHandlerProps) {
  const { values, setFieldValue } = useFormikContext<CreateRoomInput>();

  const [ready, toggleReady] = useToggle(false);
  const [, , reset] = useTimeoutFn(() => {
    toggleReady(!!values.type);
  });

  useUpdateEffect(() => {
    toggleReady(false);
    setFieldValue(
      "config",
      {
        jeopardy: getJeopardyConfig(),
        sixMinds: getSixMindsConfig(),
      }[values.type],
    );
    reset();
  }, [values.type]);

  if (!ready) {
    return null;
  }

  if (values.type === "jeopardy") {
    return <JeopardyConfigForm lng={lng} />;
  }

  if (values.type === "sixMinds") {
    return <SixMindsConfigForm lng={lng} />;
  }

  return null;
}
