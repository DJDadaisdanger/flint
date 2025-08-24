import { createContext, useContext, useState, ReactNode } from 'react';

export type PageType = 'calendar' | 'day-detail' | 'search' | 'note-edit' | 'note-view' | 'chat';

interface NavigationState {
  currentPage: PageType;
  selectedDate?: Date;
  selectedNoteId?: string;
  searchQuery?: string;
}

interface NavigationContextType {
  navigation: NavigationState;
  navigateTo: (page: PageType, data?: Partial<NavigationState>) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [navigation, setNavigation] = useState<NavigationState>({
    currentPage: 'calendar'
  });
  const [history, setHistory] = useState<NavigationState[]>([]);

  const navigateTo = (page: PageType, data?: Partial<NavigationState>) => {
    setHistory(prev => [...prev, navigation]);
    setNavigation({
      currentPage: page,
      ...data
    });
  };

  const goBack = () => {
    if (history.length > 0) {
      const previous = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setNavigation(previous);
    } else {
      setNavigation({ currentPage: 'calendar' });
    }
  };

  return (
    <NavigationContext.Provider value={{ navigation, navigateTo, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}