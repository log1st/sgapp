import { router } from "../trpc";
import { signIn } from "./auth/signIn";
import { refreshToken } from "./auth/refreshToken";
import { signUp } from "./auth/signUp";
import { signOut } from "./auth/signOut";
import { profile } from "./auth/profile";
import { submit2fa } from "./auth/submit2fa";

export const auth = router({
  signIn,
  signUp,
  signOut,
  refreshToken,
  profile,
  submit2fa,
});
