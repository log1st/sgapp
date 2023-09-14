import { getServerTranslation } from "@/i18n/getServerTranslation";
import { UiTypography } from "@/ui/utils/typography";
import { Icon, UiIcon } from "@/ui/components/icon";

export const getRoomPasswordOptions = async () => {
  const { t } = await getServerTranslation("rooms", {
    keyPrefix: "password",
  });

  return [true, false].map((value) => ({
    value,
    label: t(String(value)),
    hint: (
      <UiTypography color={value ? "tag-red-text" : "tag-green-text"}>
        <UiIcon
          icon={value ? Icon.lockClosedSolid : Icon.lockOpenSolid}
          size={16}
        />
      </UiTypography>
    ),
  }));
};
