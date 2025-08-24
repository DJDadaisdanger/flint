import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useNavigation } from './NavigationContext';
import { useCalendarWidth } from './useCalendarWidth';
import MonthYearPicker from './MonthYearPicker';

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasThoughts: boolean;
  thoughtCount: number;
  fullDate: Date;
}

interface WeekData {
  [key: number]: CalendarDay | null;
}

export default function ProductivityCalendar() {
  const { maxWidth, currentMonth: hookCurrentMonth, setCurrentMonth: hookSetCurrentMonth } = useCalendarWidth();
  const [currentMonth, setCurrentMonth] = useState(hookCurrentMonth);
  const { navigateTo } = useNavigation();

  useEffect(() => {
    hookSetCurrentMonth(currentMonth);
  }, [currentMonth, hookSetCurrentMonth]);

  const generateWeeklyCalendarData = (): WeekData[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const weeks: WeekData[] = [];
    const today = new Date();
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());
    const endDate = new Date(lastDay);
    const daysAfter = 6 - endDate.getDay();
    endDate.setDate(endDate.getDate() + daysAfter);
    const totalDays =
      Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const totalWeeks = Math.ceil(totalDays / 7);
    for (let weekIndex = 0; weekIndex < totalWeeks; weekIndex++) {
      const week: WeekData = {};
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + weekIndex * 7 + dayOfWeek);
        const isCurrentMonth = currentDate.getMonth() === month;
        const isToday =
          today.getFullYear() === currentDate.getFullYear() &&
          today.getMonth() === currentDate.getMonth() &&
          today.getDate() === currentDate.getDate();
        week[dayOfWeek] = {
          date: currentDate.getDate(),
          isCurrentMonth,
          isToday,
          hasThoughts: Math.random() > 0.5,
          thoughtCount: Math.floor(Math.random() * 8),
          fullDate: new Date(currentDate),
        };
      }
      weeks.push(week);
    }
    return weeks;
  };

  const weeks = generateWeeklyCalendarData();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const dayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
  ];

  const goToPrevMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const goToNextMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  const goToToday = () => {
    const today = new Date();
    const newMonth = new Date(today.getFullYear(), today.getMonth());
    setCurrentMonth(newMonth);
  };

  const handleMonthYearChange = (newDate: Date) => {
    setCurrentMonth(newDate);
  };

  const handleDayClick = (day: CalendarDay) => {
    if (day.isCurrentMonth) {
      navigateTo("day-detail", { selectedDate: day.fullDate });
    }
  };

  return (
    <div className="w-full max-w-full mx-auto px-2 sm:px-4 lg:px-6">
      <div className="bg-background-medium rounded-xl p-3 sm:p-4 lg:p-6 border border-background-medium max-w-2xl mx-auto">
        {/* Calendar Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-3 sm:mb-4 lg:mb-6 gap-3">
          <div className="flex items-center gap-3">
            <MonthYearPicker
              currentMonth={currentMonth}
              onMonthYearChange={handleMonthYearChange}
            >
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white tracking-tight cursor-pointer hover:text-primary-accent transition-colors duration-200" style={{ fontWeight: 400 }}>
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
            </MonthYearPicker>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevMonth}
              className="p-1.5 sm:p-2 rounded-lg bg-background-dark hover:bg-primary-accent/20 text-white hover:text-primary-accent transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-background-dark hover:bg-primary-accent/20 text-white hover:text-primary-accent transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={2} />
              <span className="text-sm sm:text-base" style={{ fontWeight: 400 }}>Today</span>
            </button>
            <button
              onClick={goToNextMonth}
              className="p-1.5 sm:p-2 rounded-lg bg-background-dark hover:bg-primary-accent/20 text-white hover:text-primary-accent transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Week Headers */}
        <div
          className="grid gap-2 sm:gap-3 mb-3 sm:mb-4"
          style={{
            gridTemplateColumns: `auto repeat(${weeks.length}, 1fr)`,
          }}
        >
          <div className="text-primary-accent text-sm sm:text-base" style={{ fontWeight: 400 }}>Day</div>
          {weeks.map((_, weekIndex) => (
            <div
              key={weekIndex}
              className="text-center text-muted-foreground text-xs sm:text-sm lg:text-base"
              style={{ fontWeight: 400 }}
            >
              Week {weekIndex + 1}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="space-y-2 sm:space-y-3">
          {dayNames.map((dayName, dayIndex) => (
            <div
              key={dayName}
              className="grid gap-2 sm:gap-3 items-center"
              style={{
                gridTemplateColumns: `auto repeat(${weeks.length}, 1fr)`,
              }}
            >
              {/* Day Label */}
              <div className="text-right text-white pr-3 sm:pr-4 lg:pr-6 border-r border-background-dark text-xs sm:text-sm lg:text-base select-none" style={{ fontWeight: 400 }}>
                {dayName.slice(0, 3)}
              </div>
              {/* Calendar Cells */}
              {weeks.map((week, weekIndex) => {
                const day = week[dayIndex];
                if (!day) {
                  return (
                    <div
                      key={weekIndex}
                      className="aspect-square rounded-lg bg-background-dark/20"
                    />
                  );
                }
                return (
                  <button
                    key={weekIndex}
                    onClick={() => handleDayClick(day)}
                    className={`
                      relative aspect-square w-full rounded-lg transition-all duration-200 group flex items-center justify-center
                      ${day.isCurrentMonth
                        ? "bg-background-dark hover:bg-primary-accent/10 text-white"
                        : "bg-background-dark/30 text-muted-foreground"
                      }
                      ${day.isToday
                        ? "outline outline-2 outline-primary-accent"
                        : ""
                      }
                    `}
                    style={{
                      fontSize: 'clamp(0.75rem, 2.5vw, 1.5rem)',
                      padding: 0,
                    }}
                  >
                    <span
                      className={`leading-none select-none ${day.isToday ? "text-primary-accent" : ""}`}
                      style={{ fontWeight: 400 }}
                    >
                      {day.date}
                    </span>
                    {/* Thought Dot */}
                    {day.hasThoughts && day.isCurrentMonth && (
                      <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 lg:bottom-3 lg:right-3">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary-accent opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
