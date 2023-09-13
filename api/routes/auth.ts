import { router } from "@/api/trpc";
import { signIn } from "@/api/routes/auth/signIn";

export const auth = router({
  signIn,
});
