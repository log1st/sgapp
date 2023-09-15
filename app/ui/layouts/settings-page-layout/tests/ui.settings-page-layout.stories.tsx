import type { Meta, StoryObj } from "@storybook/react";
import { UiSettingsPageLayout } from "../index";

const meta = {
  title: "Layouts/UiSettingsPageLayout",
  component: UiSettingsPageLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiSettingsPageLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiProfilePageLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
