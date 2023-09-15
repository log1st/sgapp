import { getTotpToken } from "@/session/getAccessToken";
import { appRedirect } from "@/utils";
import { getServerTranslation } from "@/i18n/getServerTranslation";
import { Field, Form, FormError, Submit } from "@/app/components/form";
import { UiInput } from "@/ui/components/input";
import { UiAuthSignInFormLayout } from "@/ui/layouts/auth-sign-in-form-layout";
import { UiDialog } from "@/ui/components/dialog";
import { submit2faAction } from "@/app/api/auth/submit2faAction";

export default async function Auth2FaPage() {
  if (!getTotpToken()) {
    appRedirect("/auth/sign-in");
  }

  const { t } = await getServerTranslation("auth", { keyPrefix: "2fa" });

  return (
    <UiAuthSignInFormLayout>
      <Form
        namespace="auth"
        keyPrefix="2fa"
        mutate={submit2faAction}
        initialValues={{
          code: "",
        }}
      >
        <UiDialog
          title={t("title")}
          footer={<FormError />}
          actions={[
            {
              key: "submit",
              label: t("submit"),
              wrap: Submit,
            },
          ]}
        >
          <Field name="code">
            <UiInput autoFocus placeholder={t("field.code.placeholder")} />
          </Field>
        </UiDialog>
      </Form>
    </UiAuthSignInFormLayout>
  );
}
