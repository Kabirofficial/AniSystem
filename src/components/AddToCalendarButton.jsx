import { useState, useRef, useEffect } from 'react';
import { Calendar, Download, ExternalLink } from 'lucide-react';
import { generateICSContent, downloadICS, generateGoogleCalendarUrl } from '../utils/calendarUtils';
import { clsx } from 'clsx';
import { createPortal } from 'react-dom';

/**
 * Button component to add an event to the calendar.
 * @param {Object} props
 * @param {Object} props.item - Media item with title, nextAiring, etc.
 * @param {string} [props.className] - Additional classes
 * @param {boolean} [props.compact] - If true, renders a smaller icon-only button until hovered/clicked
 */
export const AddToCalendarButton = ({ item, className, compact = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

    if (!item.nextAiring) return null;

    const releaseDate = new Date(item.nextAiring * 1000);
    const title = `New Episode: ${item.title}`;
    const description = `New episode release for ${item.title}. Episode ${item.nextEpisode || 'Unknown'}.`;

    const handleDownloadICS = (e) => {
        e.stopPropagation();
        const content = generateICSContent({
            title,
            description,
            start: releaseDate,
        });
        downloadICS(content, `${item.title}-release.ics`);
        setIsOpen(false);
    };

    const handleGoogleCalendar = (e) => {
        e.stopPropagation();
        const url = generateGoogleCalendarUrl({
            title,
            description,
            start: releaseDate,
        });
        window.open(url, '_blank');
        setIsOpen(false);
    };

    const toggleDropdown = (e) => {
        e.stopPropagation();
        if (!isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            // Default to opening above if close to bottom, else below
            const spaceBelow = window.innerHeight - rect.bottom;
            const openUpwards = spaceBelow < 150; // if less than 150px below, open up

            setDropdownPosition({
                top: openUpwards ? rect.top - 8 : rect.bottom + 8,
                left: rect.left,
                transform: openUpwards ? 'translateY(-100%)' : 'none'
            });
        }
        setIsOpen(!isOpen);
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target) && !event.target.closest('.calendar-dropdown')) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className={clsx("relative inline-block", className)}>
            <button
                ref={buttonRef}
                onClick={toggleDropdown}
                className={clsx(
                    "flex items-center gap-2 bg-bg-panel/90 backdrop-blur-sm hover:bg-white/10 text-text-main rounded-lg transition-all border border-white/5 shadow-lg",
                    compact ? "p-2" : "px-3 py-1.5 text-sm"
                )}
                title="Add to Calendar"
            >
                <Calendar size={16} className="text-brand-primary" />
                {!compact && <span>Add to Calendar</span>}
            </button>

            {isOpen && createPortal(
                <div
                    className="calendar-dropdown fixed z-[9999] min-w-[200px] bg-bg-panel border border-white/10 rounded-lg shadow-xl p-1 animate-in fade-in zoom-in-95 duration-100"
                    style={{
                        top: dropdownPosition.top,
                        left: dropdownPosition.left,
                        transform: dropdownPosition.transform
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="text-xs font-semibold text-text-muted px-2 py-1.5 uppercase tracking-wider">
                        Add to Calendar
                    </div>
                    <button
                        onClick={handleDownloadICS}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-text-main hover:bg-white/5 rounded-md transition-colors"
                    >
                        <Download size={14} />
                        <span>Download ICS File</span>
                    </button>
                    <button
                        onClick={handleGoogleCalendar}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-text-main hover:bg-white/5 rounded-md transition-colors"
                    >
                        <ExternalLink size={14} />
                        <span>Google Calendar</span>
                    </button>
                    <div className="border-t border-white/5 my-1" />
                    <div className="px-3 py-1.5 text-[10px] text-text-muted">
                        Release: {releaseDate.toLocaleString()}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};
