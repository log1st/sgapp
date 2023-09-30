import { JeopardyPackOutput } from "@/api";
import { JeopardyPackStatus } from "@/app/components/jeopardy/pack/status/JeopardyPackStatus";
import UserCard from "@/app/components/user/UserCard";
import { UiJeopardyPackHeaderLayout } from "@/ui/layouts/jeopardy-pack-header-layout";
import { getSessionLanguage } from "@/i18n/getSessionLanguage";
import { getServerTranslation } from "@/i18n/getServerTranslation";

export type JeopardyPackHeaderProps = {
  pack: JeopardyPackOutput;
};

export default async function JeopardyPackHeader({
  pack,
}: JeopardyPackHeaderProps) {
  const { t } = await getServerTranslation("jeopardy", {
    keyPrefix: "page",
  });

  return (
    <UiJeopardyPackHeaderLayout
      title={t("title", {
        name: pack.name,
      })}
      status={<JeopardyPackStatus pack={pack} lng={getSessionLanguage()} />}
      creator={<UserCard user={pack.creator} />}
    />
  );
}
