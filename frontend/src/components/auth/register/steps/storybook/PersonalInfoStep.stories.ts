import type { Meta, StoryObj } from '@storybook/react';
import PersonalInfoStep from '../PersonalInfoStep';

const meta: Meta<typeof PersonalInfoStep> = {
    title: "Register Steps/ Personal Info Step",
    component: PersonalInfoStep,
    parameters: {
        layout:"centered",
      },
}
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};