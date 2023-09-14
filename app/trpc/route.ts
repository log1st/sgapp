// eslint-disable-next-line import/no-extraneous-dependencies
import { renderTrpcPanel } from "trpc-panel";
import { apiRouter } from "@/api/apiRouter";

export const GET = () =>
  new Response(
    renderTrpcPanel(apiRouter, {
      url: "http://localhost:3000/trpc",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    },
  );
