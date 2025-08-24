import { useState, useEffect } from 'react';

interface WeekData {
  [key: number]: any | null;
}

export function useCalendarWidth() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const calculateWeeksInMonth = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Find the first Sunday of the calendar view
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());
    
    // Calculate how many weeks we need to show the complete month
    const endDate = new Date(lastDay);
    const daysAfter = 6 - endDate.getDay(); // Days to show from next month
    endDate.setDate(endDate.getDate() + daysAfter);
    
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const totalWeeks = Math.ceil(totalDays / 7);
    
    return totalWeeks;
  };

  const weeksCount = calculateWeeksInMonth(currentMonth);
  
  // Responsive width calculation - mobile first approach with better scaling
  const calculateResponsiveWidth = () => {
    // Base minimum width for mobile
    const mobileBaseWidth = 280;
    const tabletBaseWidth = 500;
    const desktopBaseWidth = 700;
    const largeDesktopBaseWidth = 900;
    
    // Week width multipliers for different screen sizes
    const mobileWeekWidth = 50;
    const tabletWeekWidth = 80;
    const desktopWeekWidth = 100;
    const largeDesktopWeekWidth = 120;
    
    return {
      mobile: Math.max(mobileBaseWidth, mobileBaseWidth + weeksCount * mobileWeekWidth),
      tablet: Math.max(tabletBaseWidth, tabletBaseWidth + weeksCount * tabletWeekWidth),
      desktop: Math.max(desktopBaseWidth, desktopBaseWidth + weeksCount * desktopWeekWidth),
      largeDesktop: Math.max(largeDesktopBaseWidth, largeDesktopBaseWidth + weeksCount * largeDesktopWeekWidth)
    };
  };

  const widths = calculateResponsiveWidth();
  
  // Use CSS clamp for fluid responsive design with a much smaller max limit
  const maxWidth = `clamp(${widths.mobile}px, 90vw, 600px)`;
  
  return {
    maxWidth,
    weeksCount,
    currentMonth,
    setCurrentMonth
  };
}