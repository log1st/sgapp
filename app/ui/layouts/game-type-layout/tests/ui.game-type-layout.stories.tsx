import type { Meta, StoryObj } from "@storybook/react";
import { UiGameTypeLayout } from "../index";

const meta = {
title: "Layouts/UiGameTypeLayout",
component: UiGameTypeLayout,
parameters: {
layout: "centered",
},
argTypes: {},
} satisfies Meta<typeof UiGameTypeLayout>;

    export const Story = {
    args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    },
    name: "UiGameTypeLayout",
    } satisfies StoryObj<typeof meta>;

        export default meta;
