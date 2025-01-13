import type { Meta, StoryObj } from '@storybook/react';
import SuccessStep from '../SuccessStep';

const meta: Meta<typeof SuccessStep> = {
    title: "Register Steps/ Success Step",
    component: SuccessStep,
    parameters: {
        layout:"centered",
      },
}
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};