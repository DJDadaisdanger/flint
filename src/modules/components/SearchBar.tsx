import { Search } from 'lucide-react';
import { useNavigation } from './NavigationContext';

interface SearchBarProps {
  maxWidth?: string;
}

export default function SearchBar({ maxWidth }: SearchBarProps) {
  const { navigateTo } = useNavigation();

  const handleSearchClick = () => {
    navigateTo('search');
  };

  return (
    <div 
      className="w-full mx-auto px-8" 
      style={{ maxWidth: maxWidth || '600px' }}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-primary-accent" strokeWidth={2} />
        </div>
        <input
          type="text"
          placeholder="Search your thoughts..."
          onClick={handleSearchClick}
          readOnly
          className="w-full pl-12 pr-6 py-4 bg-background-medium text-white placeholder-muted-foreground rounded-xl border border-background-medium focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20 focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(20,184,166,0.2)] cursor-pointer"
        />
        
        {/* Subtle inner glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-accent/5 to-bright-accent/5 pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );
}