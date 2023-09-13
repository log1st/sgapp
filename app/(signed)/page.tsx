import { getServerTranslation } from "@/i18n/getServerTranslation";

export default async function IndexPage() {
  const { t } = await getServerTranslation("meta");

  return (
    <div>
      <div>{t("language")}</div>
    </div>
  );
}
