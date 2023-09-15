"use client";

import { ReactNode } from "react";
import { UiUserLayout } from "@/ui/layouts/user-layout";
import { UiAvatar, UiAvatarSize } from "@/ui/components/avatar";
import { PublicUser } from "@/api";

export type UserCardProps = {
  user?: Pick<PublicUser, "avatar" | "login"> | null;
  side?: ReactNode;
  withLogin?: boolean;
};

export default function UserCard({
  user,
  side,
  withLogin = true,
}: UserCardProps) {
  if (!user) {
    return null;
  }

  return (
    <UiUserLayout
      avatar={
        <UiAvatar
          size={UiAvatarSize.base}
          image={user.avatar}
          letters={user.login[0]}
        />
      }
      side={side}
    >
      {!!withLogin && user.login}
    </UiUserLayout>
  );
}
