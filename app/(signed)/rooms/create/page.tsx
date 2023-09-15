import { UiCreateRoomPageLayout } from "@/ui/layouts/create-room-page-layout";
import { Form, FormError, Submit } from "@/app/components/form";
import { UiDialog } from "@/ui/components/dialog";
import { getServerTranslation } from "@/i18n/getServerTranslation";
import RoomForm from "@/app/components/rooms/create/RoomForm";
import { createRoom } from "@/app/api/rooms/createRoom";
import { getSessionLanguage } from "@/i18n/getSessionLanguage";

export default async function RoomsCreatePage() {
  const { t } = await getServerTranslation("rooms", {
    keyPrefix: "create",
  });

  return (
    <UiCreateRoomPageLayout>
      <Form
        mutate={createRoom}
        initialValues={{
          type: null as any,
          title: "",
          slug: "",
          password: "",
          private: false,
          config: {} as any,
        }}
        lng={getSessionLanguage()}
        namespace="rooms"
        keyPrefix="form"
      >
        <UiDialog
          description={t("hint")}
          title={t("title")}
          actions={[
            {
              key: "submit",
              label: t("submit"),
              wrap: Submit,
            },
          ]}
          footer={<FormError />}
        >
          <RoomForm />
        </UiDialog>
      </Form>
    </UiCreateRoomPageLayout>
  );
}
