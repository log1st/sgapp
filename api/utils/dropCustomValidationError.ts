import { z } from "zod";
import { arrayFrom, DataIndex } from "@/utils";

export const dropCustomValidationError = async <Entity>(
  message: string,
  path: DataIndex<Entity>,
  entity: Entity,
  params?: Record<string, unknown>,
) => {
  await arrayFrom(path)
    .toReversed()
    .reduce(
      (a, c, i, s) =>
        i === s.length - 1
          ? a.extend({
              [c]: z.any().refine(() => false, { message, params }),
            })
          : a.extend({
              [c]: z.object({}),
            }),
      z.object({}),
    )
    .parseAsync(entity);
};
