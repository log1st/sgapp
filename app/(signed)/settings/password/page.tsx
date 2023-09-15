import { Field, Form, Submit } from "@/app/components/form";
import { changePasswordAction } from "@/app/api/settings/changePasswordAction";
import { UiGrid } from "@/ui/utils/grid";
import { getServerTranslation } from "@/i18n/getServerTranslation";
import { UiInput, UiInputType } from "@/ui/components/input";
import { UiButton, UiButtonSize } from "@/ui/components/button";
import { UiFieldModifier } from "@/ui/components/field";

export default async function SettingsSecurityPage() {
  const { t } = await getServerTranslation("settings", {
    keyPrefix: "password",
  });

  return (
    <Form
      mutate={changePasswordAction}
      initialValues={{
        current: "",
        password: "",
        confirmation: "",
      }}
      namespace="settings"
      keyPrefix="password"
      resetOnSuccess
    >
      <UiGrid align="self-end" columns={16} gutter={16}>
        <Field name="current" label={t("field.current.label")}>
          <UiInput
            autoFocus
            modifier={UiFieldModifier.noElevation}
            htmlType={UiInputType.password}
          />
        </Field>
        <Field name="password" label={t("field.password.label")}>
          <UiInput
            modifier={UiFieldModifier.noElevation}
            htmlType={UiInputType.password}
          />
        </Field>
        <Field name="confirmation" label={t("field.confirmation.label")}>
          <UiInput
            modifier={UiFieldModifier.noElevation}
            htmlType={UiInputType.password}
          />
        </Field>
        <UiGrid.Span span={[13, 4]}>
          <Submit dirtyOnly>
            <UiButton label={t("submit")} size={UiButtonSize.large} />
          </Submit>
        </UiGrid.Span>
      </UiGrid>
    </Form>
  );
}
