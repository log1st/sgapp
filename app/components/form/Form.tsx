"use client";

import {
  FormikProvider,
  FormikValues,
  useFormik,
  Form as BaseForm,
} from "formik";
import {
  CSSProperties,
  FormEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { useToggle } from "react-use";
import { FormProvider } from "./FormContext";
import { transformResponseError, TranslatedResponseError } from ".";
import { FormDev } from "./FormDev";
import { ApiResponse } from "@/api";

export type FormProps<
  Payload extends FormikValues,
  Response,
> = PropsWithChildren<{
  className?: string;
  e2e?: string;
  style?: CSSProperties;

  mutate?(
    payload: Payload,
  ): Promise<ApiResponse<Response>> | ApiResponse<Response> | void;
  initialValues?: Payload;
  watchInitialValues?: boolean;
  onSuccess?(response: Response): void;
  namespace?: string | string[];
  keyPrefix?: string;
  disabled?: boolean;
  submitOnChange?: boolean;
  delay?: number;

  lng?: string;
  dev?: boolean;
}>;

export function Form<Payload extends FormikValues, Response>({
  initialValues = {} as Payload,
  disabled = false,
  mutate,
  submitOnChange,
  delay,
  keyPrefix,
  e2e,
  namespace,
  onSuccess,
  watchInitialValues = false,
  style,
  className,
  children,
  dev,
  lng,
}: FormProps<Payload, Response>) {
  const [submitting, toggleSubmitting] = useToggle(false);

  const [error, setError] = useState<TranslatedResponseError | null>(null);

  const formik = useFormik<Payload>({
    initialValues,
    async onSubmit(values, { setFieldError }) {
      setError(null);

      if (submitting || disabled || !mutate) {
        return;
      }

      toggleSubmitting(true);

      const response = await mutate(values);

      if (!response) {
        toggleSubmitting(false);
        return;
      }

      if (response.success) {
        onSuccess?.(response.data);
        toggleSubmitting(false);
        return;
      }

      if (response.error) {
        setError(transformResponseError(response.error, namespace, keyPrefix));
      }

      response.errors?.forEach((e) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setFieldError(...transformResponseError(e, namespace, keyPrefix));
      });

      toggleSubmitting(false);
    },
  });

  useEffect(() => {
    if (!watchInitialValues) {
      return;
    }

    if (!initialValues) {
      return;
    }

    formik.setValues(initialValues);
  }, [initialValues, watchInitialValues]);

  const timeout = useRef<ReturnType<typeof setTimeout> | null>();

  useEffect(
    () => () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    },
    [],
  );

  const onChange: FormEventHandler<HTMLFormElement> = (event) => {
    if (!submitOnChange) {
      return;
    }
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      formik.handleSubmit(event);
    }, delay);
  };

  return (
    <FormikProvider value={formik}>
      <FormProvider value={{ disabled, error, submitting, lng }}>
        <BaseForm
          onChange={onChange}
          className={className}
          style={style}
          data-e2e={e2e}
        >
          {children}
          {dev && <FormDev title="Form" />}
        </BaseForm>
      </FormProvider>
    </FormikProvider>
  );
}
