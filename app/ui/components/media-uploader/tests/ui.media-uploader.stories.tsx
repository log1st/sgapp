import type { Meta, StoryObj } from "@storybook/react";
import { UiMediaUploader } from "../index";

const meta = {
  title: "Components/UiMediaUploader",
  component: UiMediaUploader,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiMediaUploader>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiMediaUploader",
} satisfies StoryObj<typeof meta>;

export default meta;
