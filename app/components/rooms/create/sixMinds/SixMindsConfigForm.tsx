import { CreateRoomInput } from "@/api";

export type SixMindsConfigFormProps = {
  lng?: string;
};
export const getSixMindsConfig = (): CreateRoomInput["config"] => ({
  type: "sixMinds",
});

export default function SixMindsConfigForm({
  lng = "en",
}: SixMindsConfigFormProps) {
  return <div>six minds</div>;
}
