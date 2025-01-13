interface timeFormatterProps {
    dateTime: string;
}

const timeFormatter = ({ dateTime }: timeFormatterProps) => {
    // Parse date
    const parsedDate = new Date(dateTime);
    
    // Format date
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Pacific/Auckland',
    }).format(parsedDate);

    // Format time
    const formattedTime = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Pacific/Auckland',
        hour12: true,
    }).format(parsedDate);

    return { formattedDate, formattedTime };
};

export default timeFormatter;