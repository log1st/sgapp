import { TRPCError } from "@trpc/server";
import { ZodError } from "zod";
import { dropAccessToken, dropRefreshToken } from "@/session/getAccessToken";
import { filteredArray } from "@/utils";
import { refreshTokenAction } from "@/app/api/auth/refreshTokenAction";

export type ApiResponseError =
  | [string, string]
  | [string, string, Record<string, unknown>];

export type ApiResponse<Output, Meta = undefined> = {
  meta?: Meta;
} & (
  | {
      success: false;
      error: ApiResponseError | null;
      errors: Array<ApiResponseError> | null;
      data: null;
    }
  | {
      success: true;
      error: null;
      errors: null;
      data: Output;
    }
);

export const makeRequest = async <Output>(
  request: () => Promise<Output>,
  refresh = true,
): Promise<ApiResponse<Output>> => {
  try {
    return {
      success: true,
      data: await request(),
      error: null,
      errors: null,
    };
  } catch (e) {
    if (e instanceof TRPCError) {
      if (e.code === "UNAUTHORIZED") {
        if (refresh) {
          await refreshTokenAction();
        } else {
          dropAccessToken();
          dropRefreshToken();
        }
      }
      if (e.cause instanceof ZodError) {
        return {
          success: false,
          data: null,
          error: ["common", "validation"],
          errors: filteredArray(
            e.cause.errors.map((error) => [
              error.path.join("."),
              error.code === "custom" ? error.message : error.code,
              { ...error },
            ]),
          ),
        };
      }
      return {
        success: false,
        data: null,
        error: ["common", e.message, { ...e }],
        errors: null,
      };
    }
  }

  return {
    success: false,
    error: ["common", "unable"],
    errors: null,
    data: null,
  };
};
