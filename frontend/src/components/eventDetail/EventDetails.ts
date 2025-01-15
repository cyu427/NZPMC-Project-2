interface EventDetails {
    id: string;
    title: string;
    dateTime: string;
    time: string;
    location: string;
    cost: number;
    description: string;
    competitionId: string | null; 
}

export type { EventDetails };