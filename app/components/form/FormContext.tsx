"use client";

import { createContext, useContext } from "react";
import { TranslatedResponseError } from ".";

export type FormContextValues = {
  submitting: boolean;
  disabled: boolean;
  error: TranslatedResponseError | null;
  lng?: string;
};

const FormContext = createContext<FormContextValues>({
  submitting: false,
  disabled: false,
  error: null,
  lng: "en",
});

export const useForm = () => useContext(FormContext);

export const FormProvider = FormContext.Provider;
