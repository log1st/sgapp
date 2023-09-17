import { UiCreatePageLayout } from "@/ui/layouts/create-page-layout";
import { Form } from "@/app/components/form";
import { getServerTranslation } from "@/i18n/getServerTranslation";
import { getSessionLanguage } from "@/i18n/getSessionLanguage";
import JeopardyPackForm from "@/app/components/jeopardy/pack/form/JeopardyPackForm";
import { createJeopardyPackAction } from "@/app/api/jeopardy/createJeopardyPackAction";

export default async function JeopardyPacksCreatePage() {
  const { t } = await getServerTranslation("jeopardy", {
    keyPrefix: "packs.create",
  });

  return (
    <UiCreatePageLayout>
      <Form
        mutate={createJeopardyPackAction}
        lng={getSessionLanguage()}
        namespace="jeopardy"
        keyPrefix="packs.create"
        initialValues={{
          name: "",
          private: false,
          difficulty: 1,
          rounds: [],
        }}
      >
        <JeopardyPackForm
          submitLabel={t("submit")}
          lng={getSessionLanguage()}
          title={t("title")}
        />
      </Form>
    </UiCreatePageLayout>
  );
}
