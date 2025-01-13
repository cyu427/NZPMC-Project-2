import type { Meta, StoryObj } from '@storybook/react';
import AccountStep from '../AccountStep';

const meta: Meta<typeof AccountStep> = {
    title: "Register Steps/ Account Step",
    component: AccountStep,
    parameters: {
        layout:"centered",
      },
}
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};