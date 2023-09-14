import { Room } from "@prisma/client";
import {
  getListingRequest,
  ListingResponse,
} from "@/api/types/listing/ListingRequest";
import { AppRouterInput, AppRouterOutput } from "@/api/apiRouter";

export const roomsListRequest = getListingRequest({});

export type RoomsListResponse = ListingResponse<Room>;

export type RoomsListInput = AppRouterInput["rooms"]["list"];
export type RoomsListOutput = AppRouterOutput["rooms"]["list"];

export { type Room, RoomType, RoomStatus } from "@prisma/client";
