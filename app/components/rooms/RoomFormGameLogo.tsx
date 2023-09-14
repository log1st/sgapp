"use client";

import { useFormikContext } from "formik";
import { CreateRoomInput } from "@/api";
import { UiIcon } from "@/ui/components/icon";
import { getRoomTypeIcon } from "@/app/components/rooms/utils/getRoomTypeIcon";

export default function RoomFormGameLogo() {
  const { values } = useFormikContext<CreateRoomInput>();

  if (!values.type) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingBlockEnd: "40px",
      }}
    >
      <UiIcon icon={getRoomTypeIcon(values.type)} size={300} />
    </div>
  );
}
