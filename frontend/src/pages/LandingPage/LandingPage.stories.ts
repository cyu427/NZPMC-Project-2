import type { Meta, StoryObj } from '@storybook/react';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';
import LandingPage from './LandingPage';

const meta: Meta<typeof LandingPage> = {
    title: "Pages/LandingPage",
    component: LandingPage,
    parameters: {
        layout: 'centered',

        reactRouter: reactRouterParameters({
            routing: {
              path: '/',
              handle: 'LandingPage',
            },
          }),
      },
}
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};