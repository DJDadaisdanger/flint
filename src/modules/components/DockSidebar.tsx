import { Plus, MessageSquare, Calendar, Search, Settings } from 'lucide-react';
import { useNavigation } from './NavigationContext';

interface DockButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function DockButton({ icon, label, onClick }: DockButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group relative p-3 sm:p-4 bg-background-medium rounded-xl transition-all duration-300 hover:scale-110 hover:bg-background-medium/80 border border-transparent hover:border-primary-accent/30 hover:shadow-[0_0_20px_rgba(20,184,166,0.3)]"
      title={label}
    >
      {/* Icon */}
      <div className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:text-primary-accent transition-colors duration-300 flex items-center justify-center">
        {icon}
      </div>

      {/* Tooltip */}
      <div
        className="
          absolute
          lg:right-full lg:mr-3 lg:top-1/2 lg:-translate-y-1/2
          bottom-full mb-3 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0
          inline-flex items-center justify-center
          px-3 py-2 sm:px-4 sm:py-3
          bg-background-medium
          text-white text-xs sm:text-sm
          rounded-lg
          opacity-0 group-hover:opacity-100
          pointer-events-none
          transition-opacity duration-200
          whitespace-nowrap
          border border-primary-accent/20 z-50
          min-w-fit
        "
      >
        {label}

        {/* Tooltip arrow */}
        <div
          className="
            absolute
            lg:left-full lg:top-1/2 lg:-translate-y-1/2
            lg:w-0 lg:h-0
            lg:border-l-[6px] lg:border-l-background-medium
            lg:border-y-[6px] lg:border-y-transparent

            top-full left-1/2 -translate-x-1/2
            w-0 h-0
            border-t-[6px] border-t-background-medium
            border-x-[6px] border-x-transparent
            lg:border-t-0 lg:border-x-0
          "
        ></div>
      </div>
    </button>
  );
}

export default function DockSidebar() {
  const { navigateTo } = useNavigation();

  const dockButtons = [
    { 
      icon: <Plus strokeWidth={2} />, 
      label: "Add New Thought", 
      action: () => navigateTo('note-edit', { selectedDate: new Date() })
    },
    { 
      icon: <MessageSquare strokeWidth={2} />, 
      label: "Chat with AI", 
      action: () => navigateTo('chat') 
    },
    { 
      icon: <Calendar strokeWidth={2} />, 
      label: "Calendar View", 
      action: () => navigateTo('calendar')
    },
    { 
      icon: <Search strokeWidth={2} />, 
      label: "Advanced Search", 
      action: () => navigateTo('search')
    },
    { 
      icon: <Settings strokeWidth={2} />, 
      label: "Settings", 
      action: () => navigateTo('settings') 
    },
  ];

  return (
   <div className="flex flex-row lg:flex-col items-center gap-2 p-2 bg-background-dark/80 backdrop-blur-md rounded-2xl border border-background-medium/50 w-fit ml-auto">
  {dockButtons.map((button, index) => (
    <DockButton
      key={index}
      icon={button.icon}
      label={button.label}
      onClick={button.action}
    />
  ))}
</div>
  );
}