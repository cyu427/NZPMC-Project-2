import type { Meta, StoryObj } from '@storybook/react';
import EducationStep from '../EducationStep';

const meta: Meta<typeof EducationStep> = {
    title: "Register Steps/ Education Step",
    component: EducationStep,
    parameters: {
        layout:"centered",
      },
}
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};