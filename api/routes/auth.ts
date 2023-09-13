import { router } from "@/api/trpc";
import { signIn } from "@/api/routes/auth/signIn";
import { refreshToken } from "@/api/routes/auth/refreshToken";
import { signUp } from "@/api/routes/auth/signUp";
import { signOut } from "@/api/routes/auth/signOut";
import { profile } from "@/api/routes/auth/profile";

export const auth = router({
  signIn,
  signUp,
  signOut,
  refreshToken,
  profile,
});
