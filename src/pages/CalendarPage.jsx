import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, isToday, addMonths, subMonths } from 'date-fns';
import useMediaStore from '../store/useMediaStore';
import { useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { AddToCalendarButton } from '../components/AddToCalendarButton';
import { generateICSContent, downloadICS } from '../utils/calendarUtils';
import { Download } from 'lucide-react';
import { Button } from '../components/Button';

export const CalendarPage = () => {
    const { watchlist } = useMediaStore();
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = useMemo(() => {
        return eachDayOfInterval({ start: startDate, end: endDate });
    }, [startDate, endDate]);

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const releasesMap = useMemo(() => {
        const map = new Map();
        watchlist.forEach(item => {
            if (!item.nextAiring) return;
            const dateStr = format(new Date(item.nextAiring * 1000), 'yyyy-MM-dd');
            if (!map.has(dateStr)) {
                map.set(dateStr, []);
            }
            map.get(dateStr).push(item);
        });
        return map;
    }, [watchlist]);

    const getReleasesForDay = (day) => {
        const dateStr = format(day, 'yyyy-MM-dd');
        return releasesMap.get(dateStr) || [];
    };

    const handleExportMonth = () => {
        const monthEvents = [];
        calendarDays.forEach(day => {
            if (!isSameMonth(day, monthStart)) return;
            const dayReleases = getReleasesForDay(day);
            dayReleases.forEach(item => {
                if (item.nextAiring) {
                    monthEvents.push({
                        title: `New Episode: ${item.title}`,
                        description: `New episode release for ${item.title}. Episode ${item.nextEpisode || 'Unknown'}.`,
                        start: new Date(item.nextAiring * 1000)
                    });
                }
            });
        });

        if (monthEvents.length === 0) return;

        const content = generateICSContent(monthEvents);
        downloadICS(content, `AniSystem-Releases-${format(currentDate, 'MMMM-yyyy')}.ics`);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
            <SEO title="Release Schedule" description="View upcoming episodes for your tracked anime and TV shows." />
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-text-main tracking-tight">Release Schedule</h1>
                    <p className="text-text-muted mt-1">Upcoming episodes for your tracked series.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button onClick={handleExportMonth} size="sm" variant="outline" className="hidden sm:flex items-center gap-2">
                        <Download size={16} />
                        Export Month
                    </Button>
                    <div className="flex items-center gap-2 bg-bg-panel border border-white/5 rounded-lg p-1">
                        <button
                            onClick={prevMonth}
                            className="p-2 hover:bg-white/5 rounded-md text-text-muted hover:text-text-main transition-colors"
                            aria-label="Previous month"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <span className="text-sm font-medium px-4 min-w-[140px] text-center select-none text-text-main">
                            {format(currentDate, 'MMMM yyyy')}
                        </span>
                        <button
                            onClick={nextMonth}
                            className="p-2 hover:bg-white/5 rounded-md text-text-muted hover:text-text-main transition-colors"
                            aria-label="Next month"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-bg-panel border border-white/5 rounded-xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-7 border-b border-white/5 bg-bg-main/50">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="py-3 text-center text-xs font-semibold text-text-muted uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 auto-rows-[minmax(120px,auto)] divide-x divide-white/5 divide-y">
                    {calendarDays.map((day) => {
                        const releases = getReleasesForDay(day);
                        const isCurrentMonth = isSameMonth(day, monthStart);
                        const isTodayDate = isToday(day);

                        return (
                            <div
                                key={day.toString()}
                                className={clsx(
                                    "p-2 relative transition-colors hover:bg-white/[0.02] min-h-[120px]",
                                    !isCurrentMonth && "bg-bg-main/30 text-text-muted/30",
                                    isTodayDate && "bg-brand-primary/5"
                                )}
                            >
                                <span className={clsx(
                                    "text-sm font-medium block mb-2 w-7 h-7 flex items-center justify-center rounded-full",
                                    isTodayDate ? "bg-brand-primary text-white" : (isCurrentMonth ? "text-text-muted" : "text-text-muted/50")
                                )}>
                                    {format(day, 'd')}
                                </span>

                                <div className="space-y-1">
                                    {releases.map(item => (
                                        <div
                                            key={item.id}
                                            className="group relative flex items-center justify-between text-[10px] bg-brand-primary/10 text-brand-primary px-1.5 py-1 rounded border border-brand-primary/20 hover:bg-brand-primary hover:text-white transition-all"
                                            title={`${item.title} - EP ${item.nextEpisode}`}
                                        >
                                            <div className="truncate flex-1">
                                                <span className="font-bold mr-1">{item.nextEpisode ? `EP ${item.nextEpisode}` : 'New'}</span>
                                                {item.title}
                                            </div>
                                            <div className="hidden group-hover:block ml-1">
                                                <AddToCalendarButton item={item} compact={true} className="bg-transparent border-0 shadow-none p-0 hover:bg-white/20 text-white" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
