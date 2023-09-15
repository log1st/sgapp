import { fetchProfileAction } from "@/app/api/auth/fetchProfileAction";
import SettingsTwoFactorForm from "@/app/components/settings/2fa/SettingsTwoFactorForm";
import { withLocale } from "@/i18n/withLocale";
import { withTheme } from "@/theming/withTheme";
import DropTwoFactorForm from "@/app/components/settings/2fa/DropTwoFactorForm";

export default async function Settings2faPage() {
  const profile = await fetchProfileAction();

  if (!profile.success) {
    return null;
  }

  if (!profile.data.totpEnabled) {
    return withTheme(withLocale(<SettingsTwoFactorForm />));
  }

  return withLocale(<DropTwoFactorForm />);
}
