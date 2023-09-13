import type { Meta, StoryObj } from "@storybook/react";
import { UiSidebarItem } from "../index";
import { Icon } from "../../icon";
import { UiBadgeColor } from "../../badge";

const meta = {
  title: "Components/UiSidebarItem",
  component: UiSidebarItem,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiSidebarItem>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    icon: Icon.bellAlert,
    hint: "99",
    label: "Label",
    badge: {
      label: "New",
      color: UiBadgeColor.blue,
    },
    appendIcon: Icon.ellipseBlueSolid,
    active: true,
  },
  name: "UiSidebarItem",
} satisfies StoryObj<typeof meta>;

export default meta;
