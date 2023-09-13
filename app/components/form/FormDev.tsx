"use client";

import { useFormikContext } from "formik";
import { ReactNode, useEffect } from "react";
import dynamic from "next/dynamic";
import { useToggle } from "react-use";
import { useForm } from "./FormContext";
import { UiDev } from "@/ui/utils/dev";

export type FormDevProps = {
  title?: ReactNode;
};

// eslint-disable-next-line import/no-extraneous-dependencies
const ReactJson = dynamic(() => import("react-json-view"), {
  ssr: false
});

export function FormDev({ title }: FormDevProps) {
  const { submitting, disabled, error } = useForm();
  const { values, errors } = useFormikContext();

  const [ready, setReady] = useToggle(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReady(true);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return ready ? (
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
      />
    </UiDev>
  ) : null;
}
