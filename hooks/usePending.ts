import { useToggle } from "react-use";

export const usePending = (mutate?: () => unknown | Promise<unknown>) => {
  const [pending, togglePending] = useToggle(false);

  const customRun = async (customMutate?: () => unknown | Promise<unknown>) => {
    if (pending) {
      return;
    }
    togglePending(true);
    await customMutate?.();
    togglePending(false);
  };

  const run = () => customRun(mutate);

  return {
    pending,
    run,
    customRun,
  };
};
