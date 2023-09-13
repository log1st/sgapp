import type { Meta, StoryObj } from "@storybook/react";
import { UiDialog } from "../index";
import { UiButtonVariant } from "../../button";

const meta = {
  title: "Components/UiDialog",
  component: UiDialog,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiDialog>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    title: "Title",
    children: "Body",
    footer: "Footer",
    description: "Description",
    extended: true,
    actions: [
      {
        key: "cancel",
        label: "Cancel",
        variant: UiButtonVariant.secondary,
      },
      {
        key: "delete",
        label: "Delete",
        variant: UiButtonVariant.danger,
      },
    ],
  },
  name: "UiDialog",
} satisfies StoryObj<typeof meta>;

export default meta;
