import { Metadata } from "next";
import { getServerTranslation } from "@/i18n/getServerTranslation";
import { UiAuthSignInFormLayout } from "@/ui/layouts/auth-sign-in-form-layout";
import { UiDialog } from "@/ui/components/dialog";
import { UiInput, UiInputType } from "@/app/ui/components/input";
import { UiButton, UiButtonVariant } from "@/ui/components/button";
import { Field, Form, FormError, Submit } from "@/app/components/form";
import { signInAction } from "@/app/api/auth/signInAction";

export const generateMetadata = async (): Promise<Metadata> => {
  const { t } = await getServerTranslation(["auth", "meta"]);

  return {
    title: t("meta:title", {
      title: t("auth:signIn.title"),
    }),
  };
};

export default async function AuthSignInPage() {
  const {
    t,
    i18n: { language },
  } = await getServerTranslation("auth", {
    keyPrefix: "signIn",
  });

  return (
    <>
      <UiAuthSignInFormLayout>
        <Form
          mutate={signInAction}
          lng={language}
          namespace="auth"
          keyPrefix="signIn"
          initialValues={{ login: "", password: "" }}
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
            <Field name="login">
              <UiInput placeholder={t("field.login.placeholder")} autoFocus />
            </Field>
            <Field name="password">
              <UiInput
                placeholder={t("field.password.placeholder")}
                htmlType={UiInputType.password}
              />
            </Field>
          </UiDialog>
        </Form>
      </UiAuthSignInFormLayout>
      <UiButton
        href="/auth/sign-up"
        label={t("signUp")}
        variant={UiButtonVariant.transparent}
      />
    </>
  );
}
