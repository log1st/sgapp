import { z } from "zod";

export const getListingRequest = <
  Shape extends z.ZodRawShape,
  Output extends z.ZodObject<Shape>,
>(
  schema: Shape,
) =>
  z.object(schema).extend({
    page: z.coerce.number().min(1).catch(1),
    limit: z.coerce.number().catch(30),
  });

export type ListingResponse<Entity> = {
  page: number;
  total: number;
  data: Array<Entity>;
};
