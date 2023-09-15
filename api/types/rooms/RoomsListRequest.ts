import { z } from "zod";
import { RoomStatus, RoomType } from "@prisma/client";
import { getListingRequest } from "../listing/ListingRequest";
import { AppRouterInput, AppRouterOutput } from "../../apiRouter";

export const roomsListRequest = getListingRequest({
  filter: z
    .object({
      type: z.array(z.nativeEnum(RoomType)).optional().default([]),
      status: z.array(z.nativeEnum(RoomStatus)).optional().default([]),
      query: z.string().optional(),
      password: z
        .array(
          z.union([
            z.enum(["true", "false"]).transform((i) => i === "true"),
            z.coerce.boolean(),
          ]),
        )
        .optional()
        .default([]),
    })
    .optional()
    .default({
      type: [],
      password: [],
      status: [],
    }),
});

export type RoomsListInput = AppRouterInput["rooms"]["list"];
export type RoomsListOutput = AppRouterOutput["rooms"]["list"];

export type ListedRoom = NonNullable<RoomsListOutput["data"]>[number];

export { type Room, RoomType, RoomStatus } from "@prisma/client";
