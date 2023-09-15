"use client";

import { CSSProperties, useEffect, useState } from "react";
import { TFunction } from "i18next";
import { useField } from "formik";
import QRCodeStyling from "qr-code-styling";
import { UiGrid } from "@/ui/utils/grid";
import { Field, Form, Submit } from "@/app/components/form";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { usePending } from "@/hooks";
import { fetchTotpSecret } from "@/app/api/settings/fetchTotpSecret";
import { UiSwitch } from "@/ui/components/switch";
import { UiInput } from "@/ui/components/input";
import { UiTotpImageLayout } from "@/ui/layouts/totp-image-layout";
import { UiFieldModifier } from "@/ui/components/field";
import { TotpSecretOutput } from "@/api";
import { AppTheme } from "@/ui/layouts/root";
import { enable2faRequest } from "@/app/api/settings/enable2faRequest";
import { UiButton, UiButtonSize } from "@/ui/components/button";

export type TwoFactorFormProps = {
  lng?: string;
  theme?: AppTheme;
};

export type EnabledFieldProps = {
  t: TFunction;
  run(): void;
  style?: CSSProperties;
};

function EnabledField({ t, run, style }: EnabledFieldProps) {
  const [{ value }] = useField<boolean>("enabled");

  useEffect(() => {
    if (!value) {
      return;
    }

    run();
  }, [value]);

  return (
    <Field
      style={style}
      name="enabled"
      valuePropName="checked"
      label={t("field.enabled.label")}
      fixedSize={40}
    >
      <UiSwitch />
    </Field>
  );
}

export type CodeFieldProps = {
  t: TFunction;
};

function CodeField({ t }: CodeFieldProps) {
  const [{ value }] = useField<boolean>("enabled");

  if (!value) {
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

type SecretQrCodeProps = {
  loading: boolean;
  secret: TotpSecretOutput | null;
  theme: AppTheme;
};

function SecretQrCode({ secret, loading, theme }: SecretQrCodeProps) {
  const [{ value }] = useField<boolean>("enabled");

  const [qrCode, setQrCode] = useState<string | null>(null);
  useEffect(() => {
    if (!secret?.image) {
      return;
    }

    const qr = new QRCodeStyling({
      width: 1024,
      height: 1024,
      type: "svg",
      data: secret.image,
      qrOptions: {
        errorCorrectionLevel: "M",
      },
      dotsOptions: {
        color: { [AppTheme.light]: "black", [AppTheme.dark]: "white" }[theme],
      },
      backgroundOptions: {
        color: "transparent",
      },
    });

    qr.getRawData().then((blob) => {
      if (!blob) {
        return;
      }
      setQrCode(URL.createObjectURL(blob));
    });
  }, [secret?.image, theme]);

  if (!value) {
    return null;
  }

  return (
    <UiGrid.Span span={[1, 12]}>
      <UiTotpImageLayout
        loading={loading}
        secret={
          secret?.secret ? (
            <UiInput
              modifier={UiFieldModifier.centered}
              readOnly
              autoSelect
              value={secret.secret}
            />
          ) : null
        }
        image={qrCode}
      />
    </UiGrid.Span>
  );
}

type FormSubmitProps = {
  t: TFunction;
};

function FormSubmit({ t }: FormSubmitProps) {
  const [{ value }] = useField<boolean>("enabled");

  if (!value) {
    return null;
  }

  return (
    <UiGrid.Span span={[10, 3]}>
      <Submit dirtyOnly>
        <UiButton size={UiButtonSize.large} label={t("submit")} />
      </Submit>
    </UiGrid.Span>
  );
}

export default function SettingsTwoFactorForm({
  lng = "en",
  theme = AppTheme.dark,
}: TwoFactorFormProps) {
  const { t } = useClientTranslation(
    "settings",
    {
      keyPrefix: "2fa",
    },
    lng,
  );

  const [secret, setSecret] = useState<TotpSecretOutput | null>(null);
  const { run, pending } = usePending(async () => {
    if (secret) {
      return;
    }

    const response = await fetchTotpSecret();

    if (!response.success) {
      return;
    }
    setSecret(response.data);
  });

  return (
    <Form
      mutate={enable2faRequest}
      initialValues={{
        enabled: false,
        code: "",
      }}
      keyPrefix="2fa"
      namespace="settings"
    >
      <UiGrid columns={12} gutter={16}>
        <UiGrid.Span span={[1, 2]}>
          <EnabledField run={run} t={t} />
        </UiGrid.Span>
        <CodeField t={t} />
        <SecretQrCode secret={secret} loading={pending} theme={theme} />
        <FormSubmit t={t} />
      </UiGrid>
    </Form>
  );
}
