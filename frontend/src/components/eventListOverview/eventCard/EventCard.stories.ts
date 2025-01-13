import type { Meta, StoryObj } from '@storybook/react';
import EventCard from './EventCard';
import EventCardModes from './utils/EventCardModes';

const meta: Meta<typeof EventCard> = {
    title: "Events/Event",
    component: EventCard,
    parameters: {
        layout:"centered",
      },
} satisfies Meta<typeof EventCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
      name: "NZPMC Round 1",
      dateTime: new Date('2025-01-13T10:30:00'),
      location: "University of Auckland",
      cost: "13.50",
      mode: EventCardModes.USER_JOINED,
    //   primaryButtonLabel: "More Info",
    //   secondaryButtonLabel: "Sign in to Join"
  }
};