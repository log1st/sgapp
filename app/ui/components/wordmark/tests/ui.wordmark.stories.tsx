import type { Meta, StoryObj } from "@storybook/react";
import { UiWordmark } from "..";

const meta = {
  title: "Components/UiWordmark",
  component: UiWordmark,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiWordmark>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    children: "Wordmark",
  },
  name: "UiWordmark",
} satisfies StoryObj<typeof meta>;

export default meta;
