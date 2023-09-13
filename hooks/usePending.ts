import { useToggle } from "react-use";

export const usePending = (mutate?: () => void | Promise<void>) => {
  const [pending, togglePending] = useToggle(false);

  const customRun = async (customMutate?: () => void | Promise<void>) => {
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
