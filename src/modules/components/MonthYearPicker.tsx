import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface MonthYearPickerProps {
  currentMonth: Date;
  onMonthYearChange: (newDate: Date) => void;
  children: React.ReactNode;
}

export default function MonthYearPicker({
  currentMonth,
  onMonthYearChange,
  children,
}: MonthYearPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(
    currentMonth.getFullYear(),
  );
  const [selectedMonth, setSelectedMonth] = useState(
    currentMonth.getMonth(),
  );

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 10;
  const endYear = currentYear + 10;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i,
  );

  const handleApply = () => {
    const newDate = new Date(selectedYear, selectedMonth);
    onMonthYearChange(newDate);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setSelectedYear(currentMonth.getFullYear());
    setSelectedMonth(currentMonth.getMonth());
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className="hover:bg-background-dark/20 px-3 py-1 rounded-lg transition-all duration-200 hover:text-primary-accent"
          onClick={() => setIsOpen(true)}
        >
          {children}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-background-medium border border-background-dark">
        <DialogHeader className="bg-[rgba(255,255,255,0)]">
          <DialogTitle className="text-white">
            Choose a month and year to filter your data.
          </DialogTitle>
        </DialogHeader>

        {/* Year Selector */}
        <div className="mb-6">
          <label className="text-sm font-medium text-primary-accent mb-3 block">
            Year
          </label>
          <div className="flex items-center justify-between bg-background-dark rounded-lg p-3">
            <button
              onClick={() =>
                setSelectedYear(
                  Math.max(startYear, selectedYear - 1),
                )
              }
              disabled={selectedYear <= startYear}
              className="p-1 rounded hover:bg-primary-accent/20 text-white hover:text-primary-accent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-white font-medium text-lg min-w-[4rem] text-center">
              {selectedYear}
            </span>

            <button
              onClick={() =>
                setSelectedYear(
                  Math.min(endYear, selectedYear + 1),
                )
              }
              disabled={selectedYear >= endYear}
              className="p-1 rounded hover:bg-primary-accent/20 text-white hover:text-primary-accent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Month Grid */}
        <div className="mb-6">
          <label className="text-sm font-medium text-primary-accent mb-3 block">
            Month
          </label>
          <div className="grid grid-cols-3 gap-2">
            {monthNames.map((monthName, monthIndex) => (
              <button
                key={monthIndex}
                onClick={() => setSelectedMonth(monthIndex)}
                className={`
                  p-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    selectedMonth === monthIndex
                      ? "bg-primary-accent text-background-dark"
                      : "bg-background-dark text-white hover:bg-primary-accent/20 hover:text-primary-accent"
                  }
                `}
              >
                {monthName.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="bg-[rgba(218,43,43,1)] hover:bg-bright-accent text-background-dark"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            className="bg-primary-accent hover:bg-bright-accent text-background-dark"
          >
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}