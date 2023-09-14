import { NextRequest, NextResponse } from "next/server";
import { createApiCaller } from "@/api";
import { newSearchParams } from "@/utils/search/SearchParams";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url || "");

  const [, , route] = url.pathname.split("/");

  let payload: any;

  if (req.method?.toLowerCase() === "get") {
    const search = newSearchParams<{ input: string }>(url.search).raw();
    payload = JSON.parse(search!.input || "{}")?.[0]?.json;
  } else if (req.body instanceof ReadableStream) {
    payload = JSON.parse(
      String((await req.body.getReader().read()).value),
    )?.[0];
  }

  return NextResponse.json([
    {
      result: {
        data: await (
          route
            .split(".")
            .reduce((a, c) => (a as any)[c], createApiCaller()) as any
        )(payload),
      },
    },
  ]);
};

export const POST = GET;
