import type { Meta, StoryObj } from "@storybook/react";
import { UiJeopardyPackPageLayout } from "../index";

const meta = {
title: "Layouts/UiJeopardyPackPageLayout",
component: UiJeopardyPackPageLayout,
parameters: {
layout: "centered",
},
argTypes: {},
} satisfies Meta<typeof UiJeopardyPackPageLayout>;

    export const Story = {
    args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    },
    name: "UiJeopardyPackPageLayout",
    } satisfies StoryObj<typeof meta>;

        export default meta;
