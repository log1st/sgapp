"use client";

import { useForm } from "./FormContext";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { UiHint, UiHintType } from "@/ui/components/hint";

export function FormError() {
  const { error, lng } = useForm();

  const { t } = useClientTranslation(undefined, undefined, lng);

  if (!error) {
    return null;
  }

  return <UiHint type={UiHintType.danger}>{t(...error[1])}</UiHint>;
}
