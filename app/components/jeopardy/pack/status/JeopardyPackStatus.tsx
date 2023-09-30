"use client";

import { CSSProperties } from "react";
import { ListedJeopardyPack } from "@/api";
import { filteredArray } from "@/utils";
import Status, {
  StatusFlyout,
  StatusProps,
} from "@/app/components/status/Status";
import { UiBadge, UiBadgeColor } from "@/ui/components/badge";
import { UiTypography } from "@/ui/utils/typography";
import { Icon, UiIcon } from "@/ui/components/icon";
import { useClientTranslation } from "@/i18n/useClientTranslation";

export type JeopardyPackStatusProps = {
  pack: ListedJeopardyPack;
  lng?: string;
  placement?: StatusProps["placement"];
  span?: boolean;
  style?: CSSProperties;
};

export const getBadgeColorByJeopardyPackDifficulty = (
  difficulty: number,
): UiBadgeColor =>
  difficulty < 4
    ? UiBadgeColor.green
    : difficulty < 8
    ? UiBadgeColor.orange
    : UiBadgeColor.red;

export function JeopardyPackStatus({
  pack,
  lng = "en",
  placement = "top",
  span,
  style,
}: JeopardyPackStatusProps) {
  const { t } = useClientTranslation(
    "jeopardy",
    {
      keyPrefix: "packs",
    },
    lng,
  );

  const flyOuts = filteredArray<StatusFlyout>([
    [
      "difficulty",
      <UiBadge
        color={getBadgeColorByJeopardyPackDifficulty(pack.difficulty)}
        label={String(pack.difficulty)}
      />,
      t("field.difficulty"),
    ],
    [
      "rounds",
      <UiBadge color={UiBadgeColor.blue}>
        {t("roundsCount", {
          count: pack._count.rounds,
        })}
      </UiBadge>,
    ],
    [
      "plays",
      <UiBadge color={UiBadgeColor.gray}>
        {t("playsCount", {
          count: pack._count.configs,
        })}
      </UiBadge>,
    ],
    pack.private && [
      "private",
      <UiTypography color={pack.private ? "tag-red-text" : "tag-green-text"}>
        <UiIcon icon={pack.private ? Icon.eyeSlash : Icon.eye} size={16} />
      </UiTypography>,
      t(`private.${pack.private}`),
    ],
  ]);

  return (
    <Status style={style} flyOuts={flyOuts} placement={placement} span={span} />
  );
}
