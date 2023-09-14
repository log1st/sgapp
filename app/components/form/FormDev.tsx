"use client";

import { useFormikContext } from "formik";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { useForm } from "./FormContext";
import { UiDev } from "@/ui/utils/dev";

export type FormDevProps = {
  title?: ReactNode;
};

// eslint-disable-next-line import/no-extraneous-dependencies
const ReactJson = dynamic(() => import("react-json-view"), {
  ssr: false,
});

export default function FormDev({ title }: FormDevProps) {
  const { submitting, disabled, error } = useForm();
  const { values, errors } = useFormikContext();

  return (
    <UiDev title={title}>
      <ReactJson
        enableClipboard={false}
        src={{
          status: {
            submitting,
            disabled,
            error,
          },
          values,
          errors,
        }}
        theme="bright"
      />
    </UiDev>
  );
}
