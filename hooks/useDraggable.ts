import { useEffect, useState, RefObject } from "react";
import { useToggle } from "react-use";

export const useDraggable = <Element extends HTMLElement>(
  ref: RefObject<Element>,
  initialState = { x: 0, y: 0 },
) => {
  const [dragging, setDragging] = useToggle(false);

  const [dragState, setDragState] = useState(initialState);

  useEffect(() => {
    if (typeof window === "undefined") {
      return () => {};
    }
    if (!ref.current) {
      return () => {};
    }

    const onDragStart = (event: MouseEvent) => {
      event.preventDefault();
      const init: typeof dragState = {
        x: event.x - dragState.x,
        y: event.y - dragState.y,
      };

      setDragging(true);

      const handle = (moveEvent: MouseEvent) => {
        setDragState({
          x: moveEvent.x - init.x,
          y: moveEvent.y - init.y,
        });
      };

      const unhandle = (upEvent: MouseEvent) => {
        upEvent.stopPropagation();
        setDragging(false);
        document.removeEventListener("mousemove", handle);
        document.removeEventListener("mouseup", unhandle);
      };

      document.addEventListener("mousemove", handle);
      document.addEventListener("mouseup", unhandle);
    };

    ref.current.addEventListener("mousedown", onDragStart);

    return () => {
      ref.current?.removeEventListener("mousedown", onDragStart);
    };
  }, [ref.current, setDragging, setDragState, dragState]);

  return {
    dragState,
    dragging,
  };
};
