import { UiSidebar, UiSidebarGroup } from "@/ui/layouts/sidebar";
import { fetchProfileAction } from "@/app/api/auth/fetchProfileAction";
import { getServerTranslation } from "@/i18n/getServerTranslation";
import { UiAvatar, UiAvatarSize } from "@/ui/components/avatar";
import { UiButton, UiButtonVariant } from "@/ui/components/button";
import { UiSidebarItem, UiSidebarItemType } from "@/ui/components/sidebar-item";
import { getSessionTheme } from "@/session/getSessionTheme";
import { AppTheme } from "@/ui/layouts/root";
import { Icon } from "@/ui/components/icon";
import { getSessionLanguage } from "@/session/getSessionLanguage";
import { switchLanguage } from "@/app/api/layout/switchLanguage";
import { switchTheme } from "@/app/api/layout/switchTheme";
import LanguageSwitcher from "@/app/components/layout/languageSwitcher/LanguageSwitcher";
import { withLocale } from "@/i18n/withLocale";
import { withTheme } from "@/i18n/withTheme";
import ThemeSwitcher from "@/app/components/layout/themeSwitcher/ThemeSwitcher";
import { signOutAction } from "@/app/api/auth/signOutAction";
import SignOut from "@/app/components/layout/signOut/SignOut";

export default async function Sidebar() {
  const { t } = await getServerTranslation(["sidebar", "meta"]);

  const profile = await fetchProfileAction();

  return (
    <UiSidebar
      avatar={
        profile.data ? (
          <UiButton variant={UiButtonVariant.link} href="/profile">
            <UiAvatar
              size={UiAvatarSize.large}
              image={profile.data.avatar}
              letters={profile.data.login[0]}
            />
          </UiButton>
        ) : null
      }
      expandable
      label={profile.data?.login}
      hint={t("pureTitle")}
    >
      <UiSidebarGroup margin>
        {withLocale(withTheme(<ThemeSwitcher />))}
        {withLocale(<LanguageSwitcher />)}
      </UiSidebarGroup>
      <UiSidebarGroup>{withLocale(<SignOut />)}</UiSidebarGroup>
    </UiSidebar>
  );
}
