import { format } from 'date-fns';

/**
 * Formats a date object to ICS standard string (YYYYMMDDTHHMMSSZ)
 * @param {Date|number} date - Date object or timestamp
 * @returns {string} ICS formatted date string
 */
const formatToICSDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

/**
 * Generates the content for an ICS file
 * @param {Object|Object[]} events - Single event object or array of event objects
 * @param {string} events.title - Event title
 * @param {string} events.description - Event description
 * @param {Date|number} events.start - Start time
 * @param {Date|number} events.end - End time (optional, defaults to 1 hour after start)
 * @returns {string} ICS content string
 */
export const generateICSContent = (events) => {
    const eventList = Array.isArray(events) ? events : [events];
    const now = new Date();
    const nowStr = formatToICSDate(now);

    const vEvents = eventList.map(event => {
        const startDate = new Date(event.start);
        const endDate = event.end ? new Date(event.end) : new Date(startDate.getTime() + 60 * 60 * 1000); // Default 1 hour duration
        const uid = `${now.getTime()}-${Math.floor(Math.random() * 100000)}-${eventList.indexOf(event)}@anisystem.app`;

        return [
            'BEGIN:VEVENT',
            `UID:${uid}`,
            `DTSTAMP:${nowStr}`,
            `DTSTART:${formatToICSDate(startDate)}`,
            `DTEND:${formatToICSDate(endDate)}`,
            `SUMMARY:${event.title}`,
            `DESCRIPTION:${event.description}`,
            'BEGIN:VALARM',
            'TRIGGER:-PT15M',
            'ACTION:DISPLAY',
            'DESCRIPTION:Reminder',
            'END:VALARM',
            'END:VEVENT'
        ].join('\r\n');
    }).join('\r\n');

    return [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//AniSystem//Media Tracker//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        vEvents,
        'END:VCALENDAR'
    ].join('\r\n');
};

/**
 * Triggers a download of the ICS file
 * @param {string} content - ICS file content
 * @param {string} filename - Filename for the download
 */
export const downloadICS = (content, filename) => {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename.endsWith('.ics') ? filename : `${filename}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

/**
 * Generates a Google Calendar add event URL
 * @param {Object} event - Event details
 * @param {string} event.title - Event title
 * @param {string} event.description - Event description
 * @param {Date|number} event.start - Start time
 * @param {Date|number} event.end - End time
 * @returns {string} Google Calendar URL
 */
export const generateGoogleCalendarUrl = ({ title, description, start, end }) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date(startDate.getTime() + 60 * 60 * 1000);

    const dates = `${formatToICSDate(startDate)}/${formatToICSDate(endDate)}`;

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: title,
        details: description,
        dates: dates,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
