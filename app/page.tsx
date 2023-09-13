import { createApiCaller } from "@/api/client/createApiCaller";
import { getServerTranslation } from "@/i18n/getServerTranslation";

export default async function IndexPage() {
  const res = await createApiCaller().auth.signIn();

  const { t } = await getServerTranslation("meta");

  return (
    <div>
      <div>{JSON.stringify(res)}</div>
      <div>{t("language")}</div>
    </div>
  );
}
