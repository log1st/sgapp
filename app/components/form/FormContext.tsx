"use client";

import { createContext, useContext } from "react";
import { TranslatedResponseError } from ".";
import { DataIndex } from "@/utils";

export type FormContextValues<State extends Record<string, unknown>> = {
  submitting: boolean;
  disabled: boolean;
  error: TranslatedResponseError | null;
  lng?: string;
  state: State;
  setState(key: DataIndex<any>, value?: unknown): void;
};

const FormContext = createContext<FormContextValues<any>>({
  submitting: false,
  disabled: false,
  error: null,
  lng: "en",
  state: {},
  setState: () => {},
});

export const useForm = <State extends Record<string, unknown>>() =>
  useContext(FormContext) as FormContextValues<State>;

export const FormProvider = FormContext.Provider;
