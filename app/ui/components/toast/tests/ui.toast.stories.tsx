import type { Meta, StoryObj } from "@storybook/react";
import { UiToast, UiToastStatus } from "../index";
import { Icon } from "../../icon";

const meta = {
  title: "Components/UiToast",
  component: UiToast,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiToast>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    icon: Icon.informationCircleSolid,
    title: "Title",
    message: "Message",
    status: UiToastStatus.success,
    actions: [
      {
        key: "one",
        loading: true,
        label: "Action",
        primary: true,
      },
      {
        key: "close",
        label: "Close",
      },
    ],
  },
  name: "UiToast",
} satisfies StoryObj<typeof meta>;

export default meta;
