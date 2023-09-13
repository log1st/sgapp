import { NextApiHandler } from "next";
import { NextResponse } from "next/server";
import { createApiCaller } from "@/api";
import { newSearchParams } from "@/utils/search/SearchParams";

export const GET: NextApiHandler = async (req) => {
  const url = new URL(req.url || "");

  const [, , route] = url.pathname.split("/");

  let payload: any;

  if (req.method?.toLowerCase() === "get") {
    const search = newSearchParams(url.search).raw<{ input: string }>();
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
