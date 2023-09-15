import { isAfter } from "date-fns";
import { RoomsListOutput } from "@/api";
import { UiJeopardyRoomInfoCardLayout } from "@/ui/layouts/jeopardy-room-info-card-layout";
import { UiAvatar } from "@/ui/components/avatar";
import { Icon } from "@/ui/components/icon";
import Flyout from "@/app/components/flyout/Flyout";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { UiTooltip } from "@/ui/components/tooltip";
import { UiAvatarsStack } from "@/ui/layouts/avatars-stack";
import UserCard from "@/app/components/user/UserCard";
import { UiTypography, UiTypographyType } from "@/ui/utils/typography";

export type RoomInfoCardProps = {
  room: NonNullable<RoomsListOutput["data"]>[number];
  lng?: string;
};

function JeopardyRoomInfoCard({ room, lng }: RoomInfoCardProps) {
  const showman = room.jeopardyUsersOnRooms.find(
    (user) => user.role === "showman",
  );
  const players = room.jeopardyUsersOnRooms
    .filter((user) => user.role === "player")
    .toSorted((a, b) =>
      a.points === b.points
        ? isAfter(a.joinedAt, b.joinedAt)
          ? 1
          : -1
        : a.points > b.points
        ? 1
        : -1,
    );

  const { t } = useClientTranslation(
    "jeopardy",
    {
      keyPrefix: "infoCard",
    },
    lng,
  );

  const maxPlayers = 4;

  return (
    <UiJeopardyRoomInfoCardLayout
      players={
        <Flyout
          flyout={
            <UiTooltip>
              <UiTypography type={UiTypographyType.mediumPlus}>
                {t("players", {
                  count: players.length,
                })}
              </UiTypography>
              {players.map((player) => (
                <UserCard
                  user={player.user}
                  key={player.userId}
                  side={
                    <UiTypography color="fg-muted">
                      {t("points", {
                        points: player.points,
                      })}
                    </UiTypography>
                  }
                />
              ))}
            </UiTooltip>
          }
        >
          <UiAvatarsStack>
            {players.slice(0, maxPlayers).map((player) => (
              <UiAvatar
                key={player.userId}
                image={player.user.avatar}
                letters={player.user.login[0]}
              />
            ))}
            {players.length > maxPlayers && (
              <UiAvatar
                letters={
                  <UiTypography type={UiTypographyType.compactXSmallPlus}>
                    {players.length - maxPlayers}
                  </UiTypography>
                }
              />
            )}
          </UiAvatarsStack>
        </Flyout>
      }
      showman={
        showman ? (
          <Flyout
            options={{ placement: "top" }}
            delay={0}
            flyout={
              <UiTooltip>
                {t("showman", {
                  login: showman.user.login,
                })}
              </UiTooltip>
            }
          >
            <UiAvatar
              image={showman.user.avatar}
              letters={showman.user.login[0]}
            />
          </Flyout>
        ) : (
          <Flyout
            flyout={<UiTooltip>{t("noShowman")}</UiTooltip>}
            delay={0}
            options={{ placement: "top" }}
          >
            <UiAvatar icon={Icon.questionMarkCircle} />
          </Flyout>
        )
      }
    />
  );
}

export default function RoomInfoCard({ room, lng = "en" }: RoomInfoCardProps) {
  if (room.type === "jeopardy") {
    return <JeopardyRoomInfoCard room={room} lng={lng} />;
  }

  return null;
}
