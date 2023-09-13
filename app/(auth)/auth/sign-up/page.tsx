import { getServerTranslation } from "@/i18n/getServerTranslation";
import { UiDialog } from "@/ui/components/dialog";
import { UiInput, UiInputType } from "@/app/ui/components/input";
import { UiButton, UiButtonVariant } from "@/ui/components/button";
import { Field, Form, FormError, Submit } from "@/app/components/form";
import { UiAuthSignUpFormLayout } from "@/ui/layouts/auth-sign-up-form-layout";
import { UiCheckbox } from "@/ui/components/checkbox";
import { signUpAction } from "@/app/api/auth/signUpAction";

export default async function AuthSignUpPage() {
  const {
    t,
    i18n: { language },
  } = await getServerTranslation("auth", {
    keyPrefix: "signUp",
  });

  return (
    <UiAuthSignUpFormLayout>
      <Form
        mutate={signUpAction}
        lng={language}
        namespace="auth"
        keyPrefix="signUp"
        initialValues={{
          login: "",
          password: "",
          confirmation: "",
          agreement: false,
        }}
      >
        <UiDialog
          title={t("title")}
          footer={<FormError />}
          actions={[
            {
              key: "signIn",
              label: t("signIn"),
              href: "/auth/sign-in",
              variant: UiButtonVariant.secondary,
            },
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
          <Field name="confirmation">
            <UiInput
              placeholder={t("field.confirmation.placeholder")}
              htmlType={UiInputType.password}
            />
          </Field>
          <Field name="agreement" valuePropName="checked">
            <UiCheckbox
              panel
              label={t("field.agreement.label")}
              hint={
                <UiButton variant={UiButtonVariant.link} href="#agreement" stop>
                  {t("field.agreement.hint")}
                </UiButton>
              }
            />
          </Field>
        </UiDialog>
      </Form>
    </UiAuthSignUpFormLayout>
  );
}
