import type { Meta, StoryObj } from "@storybook/react";
import { UiJeopardyPackHeaderLayout } from "../index";

const meta = {
title: "Layouts/UiJeopardyPackHeaderLayout",
component: UiJeopardyPackHeaderLayout,
parameters: {
layout: "centered",
},
argTypes: {},
} satisfies Meta<typeof UiJeopardyPackHeaderLayout>;

    export const Story = {
    args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    },
    name: "UiJeopardyPackHeaderLayout",
    } satisfies StoryObj<typeof meta>;

        export default meta;
