import { z } from "zod";

export const getListingRequest = <
  Shape extends z.ZodRawShape,
  Output extends z.ZodObject<Shape> = z.ZodObject<Shape>,
>(
  schema: Shape,
  limit = 30,
) =>
  z.object(schema).extend({
    page: z.coerce.number().min(1).catch(1),
    limit: z.coerce.number().catch(limit),
  });

export type ListingRequest<Payload> = z.infer<
  ReturnType<typeof getListingRequest<Record<keyof Payload, z.ZodTypeAny>>>
>;

export type ListingResponse<Entity> = {
  page: number;
  total: number;
  limit: number;
  data: Array<Entity>;
};
