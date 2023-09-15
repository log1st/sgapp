import AvatarForm from "@/app/components/settings/avatar/AvatarForm";
import { getSessionLanguage } from "@/i18n/getSessionLanguage";
import { fetchProfileAction } from "@/app/api/auth/fetchProfileAction";

export default async function SettingsAvatarPage() {
  const profile = await fetchProfileAction();
  return (
    <AvatarForm lng={getSessionLanguage()} hasAvatar={!!profile.data?.avatar} />
  );
}
