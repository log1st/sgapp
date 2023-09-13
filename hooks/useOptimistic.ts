"use client";

import { useEffect, useState } from "react";

export const useOptimistic = <Entity>(source: Entity) => {
  const [state, setState] = useState(source);
  useEffect(() => {
    setState(source);
  }, [source]);

  return [state, setState] as const;
};
