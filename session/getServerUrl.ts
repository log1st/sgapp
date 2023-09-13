import { headers } from "next/headers";

export const urlContextKey = "x-url";
export const getServerUrl = () => new URL(headers().get(urlContextKey) ?? "");
