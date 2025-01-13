import type { Meta, StoryObj } from '@storybook/react';
import VerificationStep from '../VerificationStep';

const meta: Meta<typeof VerificationStep> = {
    title: "Register Steps/ Verification Step",
    component: VerificationStep,
    parameters: {
        layout:"centered",
      },
}
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};