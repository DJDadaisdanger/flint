import { NavigationProvider, useNavigation } from './components/NavigationContext';
import CalendarLayout from './components/layout/CalendarLayout';
import PageLayout from './components/layout/PageLayout';
import DayDetailView from './components/DayDetailView';
import SearchPage from './components/SearchPage';
import NoteEditPage from './components/NoteEditPage';
import NoteViewPage from './components/NoteViewPage';
import ChatInterface from './components/ChatInterface';
import SettingsPage from './components/SettingsPage';

function AppContent() {
  const { navigation } = useNavigation();

  const renderCurrentPage = () => {
    switch (navigation.currentPage) {
      case 'calendar':
        return <CalendarLayout />;
      
      case 'day-detail':
        return (
          <PageLayout>
            <DayDetailView />
          </PageLayout>
        );
      
      case 'search':
        return (
          <PageLayout>
            <SearchPage />
          </PageLayout>
        );
      
      case 'note-edit':
        return (
          <PageLayout>
            <NoteEditPage />
          </PageLayout>
        );
      
      case 'note-view':
        return (
          <PageLayout>
            <NoteViewPage />
          </PageLayout>
        );
      
      case 'chat':
        return (
          <PageLayout>
            <ChatInterface />
          </PageLayout>
        );
      
      case 'settings':
        return (
          <PageLayout>
            <SettingsPage />
          </PageLayout>
        );
      
      default:
        return <CalendarLayout />;
    }
  };

  return (
    <div className="dark min-h-screen bg-background-dark">
      {renderCurrentPage()}
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}