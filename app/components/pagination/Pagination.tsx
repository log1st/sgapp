"use client";

import { useField, useFormikContext } from "formik";
import { UiPaginationLayout } from "@/ui/layouts/pagination-layout";
import {
  UiButton,
  UiButtonSize,
  UiButtonVariant,
} from "@/ui/components/button";
import { Icon } from "@/ui/components/icon";
import { Field } from "../form";
import { UiInput, UiInputType } from "@/app/ui/components/input";
import { UiFieldModifier } from "@/ui/components/field";

export type PaginationProps = {
  totalPages: number;
};

export default function Pagination({ totalPages }: PaginationProps) {
  const [{ value }, , { setValue }] = useField<number>("page");
  const { submitForm } = useFormikContext();
  const goTo = (newPage: number) => async () => {
    await setValue(Math.max(Math.min(newPage, totalPages), 1));
    submitForm();
  };

  return (
    <UiPaginationLayout
      previous={
        <UiButton
          variant={UiButtonVariant.transparent}
          label={Icon.chevronLeft}
          size={UiButtonSize.large}
          disabled={value <= 1}
          onClick={goTo(value - 1)}
        />
      }
      next={
        <UiButton
          variant={UiButtonVariant.transparent}
          label={Icon.chevronRight}
          size={UiButtonSize.large}
          disabled={value >= totalPages}
          onClick={goTo(value + 1)}
        />
      }
    >
      <Field name="page" submitOnBlur>
        <UiInput
          modifier={[UiFieldModifier.centered, UiFieldModifier.noElevation]}
          htmlType={UiInputType.number}
          step={1}
          min={1}
          max={totalPages}
          after={`/ ${totalPages}`}
        />
      </Field>
    </UiPaginationLayout>
  );
}
