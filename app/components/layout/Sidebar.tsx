import { UiSidebar, UiSidebarGroup } from "@/ui/layouts/sidebar";
import { fetchProfileAction } from "@/app/api/auth/fetchProfileAction";
import { getServerTranslation } from "@/i18n/getServerTranslation";
import { UiAvatar, UiAvatarSize } from "@/ui/components/avatar";
import { UiButton, UiButtonVariant } from "@/ui/components/button";
import LanguageSwitcher from "@/app/components/layout/languageSwitcher/LanguageSwitcher";
import { withLocale } from "@/i18n/withLocale";
import { withTheme } from "@/theming/withTheme";
import ThemeSwitcher from "@/app/components/layout/themeSwitcher/ThemeSwitcher";
import SignOut from "@/app/components/layout/signOut/SignOut";
import SidebarToggle from "@/app/components/layout/toggle/SidebarToggle";
import { getSessionSetting } from "@/session/sessionSetting";
import { SettingType } from "@/session/settingType";
import SidebarMainMenu from "@/app/components/layout/mainMenu/SidebarMainMenu";

export default async function Sidebar() {
  const { t } = await getServerTranslation(["meta", "sidebar"]);

  const profile = await fetchProfileAction();

  const expanded = getSessionSetting(SettingType.sidebar, true);

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
      expanded={expanded}
      expandable={<SidebarToggle sidebar={expanded} />}
      label={profile.data?.login}
      hint={t("pureTitle")}
    >
      {withLocale(<SidebarMainMenu />)}
      {/* <UiSidebarGroup noExpanded> */}
      {/*  <UiSidebarLabel> */}
      {/*    <UiInput size={UiFieldSize.small} placeholder="Room #" /> */}
      {/*  </UiSidebarLabel> */}
      {/* </UiSidebarGroup> */}
      <UiSidebarGroup margin>
        {withLocale(withTheme(<ThemeSwitcher />))}
        {withLocale(<LanguageSwitcher />)}
      </UiSidebarGroup>
      <UiSidebarGroup>{withLocale(<SignOut />)}</UiSidebarGroup>
    </UiSidebar>
  );
}
