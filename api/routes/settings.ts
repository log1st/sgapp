import { router } from "../trpc";
import { changePassword } from "./settings/changePassword";
import { enable2fa } from "./settings/enable2fa";
import { totpSecret } from "./settings/totpSecret";
import { disable2fa } from "./settings/disable2fa";
import { changeAvatar } from "./settings/changeAvatar";

export const settings = router({
  changePassword,
  totpSecret,
  enable2fa,
  disable2fa,
  changeAvatar,
});
