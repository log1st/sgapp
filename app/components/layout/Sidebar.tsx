import { UiSidebar, UiSidebarGroup } from "@/ui/layouts/sidebar";
import { fetchProfileAction } from "@/app/api/auth/fetchProfileAction";
import { getServerTranslation } from "@/i18n/getServerTranslation";
import { UiAvatar, UiAvatarSize } from "@/ui/components/avatar";
import { UiButton, UiButtonVariant } from "@/ui/components/button";
import LanguageSwitcher from "@/app/components/layout/languageSwitcher/LanguageSwitcher";
import { withLocale } from "@/i18n/withLocale";
import { withTheme } from "@/i18n/withTheme";
import ThemeSwitcher from "@/app/components/layout/themeSwitcher/ThemeSwitcher";
import SignOut from "@/app/components/layout/signOut/SignOut";
import { UiSidebarItem } from "@/ui/components/sidebar-item";
import { UiInput } from "@/ui/components/input";
import { UiFieldSize } from "@/ui/components/field";
import { UiSidebarLabel } from "@/ui/components/sidebar-label";
import { Icon } from "@/ui/components/icon";

export default async function Sidebar() {
  const { t } = await getServerTranslation(["meta", "sidebar"]);

  const profile = await fetchProfileAction();

  return (
    <UiSidebar
      avatar={
        profile.data ? (
          <UiButton variant={UiButtonVariant.link} href="/profile">
            <UiAvatar
              size={UiAvatarSize.xLarge}
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
      <UiSidebarGroup>
        <UiSidebarItem icon={Icon.puzzle} label="Games" />
        <UiSidebarItem icon={Icon.plus} label="Create room" />
      </UiSidebarGroup>
      <UiSidebarGroup noExpanded>
        <UiSidebarLabel>
          <UiInput size={UiFieldSize.small} placeholder="Room #" />
        </UiSidebarLabel>
      </UiSidebarGroup>
      <UiSidebarGroup margin>
        {withLocale(withTheme(<ThemeSwitcher />))}
        {withLocale(<LanguageSwitcher />)}
      </UiSidebarGroup>
      <UiSidebarGroup>{withLocale(<SignOut />)}</UiSidebarGroup>
    </UiSidebar>
  );
}
