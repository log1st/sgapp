import { Field } from "@/app/components/form";
import { UiRoomFormLayout } from "@/ui/layouts/create-room-form-layout";
import { UiSelect } from "@/ui/components/select";
import { getRoomTypesOptions } from "@/app/components/rooms/utils/getRoomTypesOptions";
import { getServerTranslation } from "@/i18n/getServerTranslation";
import { UiCheckbox } from "@/ui/components/checkbox";
import { UiInput, UiInputType } from "@/ui/components/input";
import { RoomFormConfigHandler } from "@/app/components/rooms/create/RoomFormConfigHandler";
import { getSessionLanguage } from "@/i18n/getSessionLanguage";

export default async function RoomForm() {
  const typeOptions = await getRoomTypesOptions();
  const { t } = await getServerTranslation("rooms", {
    keyPrefix: "form",
  });

  return (
    <UiRoomFormLayout
      type={
        <Field name="type" label={t("field.type.label")}>
          <UiSelect options={typeOptions} />
        </Field>
      }
      title={
        <Field name="title" label={t("field.title.label")}>
          <UiInput />
        </Field>
      }
      slug={
        <Field
          name="slug"
          label={t("field.slug.label")}
          hint={t("field.slug.hint")}
        >
          <UiInput />
        </Field>
      }
      password={
        <Field name="password" label={t("field.password.label")}>
          <UiInput
            htmlType={UiInputType.password}
            after={t("field.password.hint")}
          />
        </Field>
      }
      privateField={
        <Field name="private" valuePropName="checked">
          <UiCheckbox
            label={t("field.private.label")}
            hint={t("field.private.hint")}
          />
        </Field>
      }
    >
      <RoomFormConfigHandler lng={getSessionLanguage()} />
    </UiRoomFormLayout>
  );
}
