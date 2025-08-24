import React from 'react';
import SearchBar from '../SearchBar';
import ProductivityCalendar from '../ProductivityCalendar';
import DockSidebar from '../DockSidebar';
import { useCalendarWidth } from '../useCalendarWidth';
import { DOCK_POSITIONING, LAYOUT_CLASSES } from './LayoutConstants';

export default function CalendarLayout() {
  const { maxWidth } = useCalendarWidth();

  return (
    <div className="relative min-h-screen">
      {/* Top search section */}
      <div className={LAYOUT_CLASSES.SEARCH_SECTION}>
        <SearchBar maxWidth={maxWidth} />
      </div>

      {/* Main content container */}
      <div className="flex justify-center w-full px-2 sm:px-4 lg:px-6"> 
        <div className="w-full max-w-full py-4 sm:py-6 lg:py-8">
          <div className="w-full">
            <ProductivityCalendar />
          </div>
        </div>
      </div>

      {/* Fixed dock sidebar with bottom-only positioning */}
      <div className={DOCK_POSITIONING.CALENDAR}>
        <DockSidebar />
      </div>
    </div>
  );
}
