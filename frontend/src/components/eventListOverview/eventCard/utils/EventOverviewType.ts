interface EventOverviewType {
    id: string;
    name: string;
    dateTime: Date;
    location: string;
    cost: string;
    description: string;
    endDateTime?: Date;
    competitionId?: string;
}

export default EventOverviewType;