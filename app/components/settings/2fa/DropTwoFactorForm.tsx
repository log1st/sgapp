"use client";

import { TFunction } from "i18next";
import { useField } from "formik";
import { UiGrid } from "@/ui/utils/grid";
import { Field, Form, Submit } from "@/app/components/form";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { UiInput } from "@/ui/components/input";
import { AppTheme } from "@/ui/layouts/root";
import {
  UiButton,
  UiButtonSize,
  UiButtonVariant,
} from "@/ui/components/button";
import { UiSwitch } from "@/ui/components/switch";
import { disable2faRequest } from "@/app/api/settings/disable2faRequest";

export type TwoFactorFormProps = {
  lng?: string;
  theme?: AppTheme;
};

export type CodeFieldProps = {
  t: TFunction;
};

function CodeField({ t }: CodeFieldProps) {
  const [{ value }] = useField<boolean>("enabled");

  if (value) {
    return null;
  }

  return (
    <UiGrid.Span span={[3, 10]}>
      <Field
        name="code"
        label={t("field.code.label")}
        hint={t("field.code.hint")}
      >
        <UiInput />
      </Field>
    </UiGrid.Span>
  );
}

type FormSubmitProps = {
  t: TFunction;
};

function FormSubmit({ t }: FormSubmitProps) {
  const [{ value }] = useField<boolean>("enabled");

  if (value) {
    return null;
  }

  return (
    <UiGrid.Span span={[10, 3]}>
      <Submit dirtyOnly>
        <UiButton
          variant={UiButtonVariant.danger}
          size={UiButtonSize.large}
          label={t("submit")}
        />
      </Submit>
    </UiGrid.Span>
  );
}

export default function DropTwoFactorForm({ lng = "en" }: TwoFactorFormProps) {
  const { t } = useClientTranslation(
    "settings",
    {
      keyPrefix: "drop2fa",
    },
    lng,
  );

  return (
    <Form
      mutate={disable2faRequest}
      initialValues={{
        enabled: true,
        code: "",
      }}
      keyPrefix="2fa"
      namespace="settings"
    >
      <UiGrid columns={12} gutter={16}>
        <UiGrid.Span span={[1, 2]}>
          <Field
            name="enabled"
            valuePropName="checked"
            label={t("field.enabled.label")}
            fixedSize={40}
          >
            <UiSwitch />
          </Field>
        </UiGrid.Span>
        <CodeField t={t} />
        <FormSubmit t={t} />
      </UiGrid>
    </Form>
  );
}
