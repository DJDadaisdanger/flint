import { useState, useEffect } from 'react';
import { ArrowLeft, Edit3, Clock, MapPin, Tag, Cloud, CloudOff } from 'lucide-react';
import { useNavigation } from './NavigationContext';

interface NoteData {
  id: string;
  title: string;
  content: string;
  tags: string[];
  location?: string;
  date: Date;
  time: string;
  syncStatus: 'synced' | 'syncing' | 'offline';
}

export default function NoteViewPage() {
  const { navigation, goBack, navigateTo } = useNavigation();
  const [noteData, setNoteData] = useState<NoteData | null>(null);
  
  const noteId = navigation.selectedNoteId;

  // Mock loading note data
  useEffect(() => {
    if (noteId) {
      // Simulate loading from backend
      setTimeout(() => {
        setNoteData({
          id: noteId,
          title: 'Design System Updates',
          content: 'Updated the color palette to include the new cyan accent colors. All components should now use the consistent dark theme.\n\nKey changes:\n- Background dark: #0a0a0a\n- Primary accent: #14b8a6\n- Consistent spacing using 8px grid\n\nNext steps:\n- Update documentation\n- Review component library\n- Test across different devices\n\nThis is looking really good so far. The cyan accents provide great contrast against the dark background while maintaining readability.',
          tags: ['design', 'ui', 'colors', 'system'],
          location: 'Home Office',
          date: new Date('2025-08-15'),
          time: '2:15 PM',
          syncStatus: 'synced'
        });
      }, 500);
    }
  }, [noteId]);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleEdit = () => {
    navigateTo('note-edit', { selectedNoteId: noteId });
  };

  const getSyncIcon = () => {
    if (!noteData) return null;
    
    switch (noteData.syncStatus) {
      case 'synced':
        return <Cloud className="w-4 h-4 text-primary-accent" strokeWidth={2} />;
      case 'syncing':
        return <Cloud className="w-4 h-4 text-yellow-400 animate-pulse" strokeWidth={2} />;
      case 'offline':
        return <CloudOff className="w-4 h-4 text-red-400" strokeWidth={2} />;
    }
  };

  const getSyncText = () => {
    if (!noteData) return '';
    
    switch (noteData.syncStatus) {
      case 'synced':
        return 'Synced';
      case 'syncing':
        return 'Syncing...';
      case 'offline':
        return 'Offline';
    }
  };

  if (!noteData) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading note...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={goBack}
              className="p-2 rounded-lg bg-background-medium hover:bg-primary-accent/20 text-white hover:text-primary-accent transition-all duration-200 hover:scale-110"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={2} />
            </button>
            <div>
              <h1 className="text-3xl font-semibold text-white">
                {noteData.title}
              </h1>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-2 text-primary-accent">
                  <Clock className="w-4 h-4" strokeWidth={2} />
                  <span className="text-sm font-medium">{noteData.time}</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  {formatDate(noteData.date)}
                </p>
                <div className="flex items-center gap-2">
                  {getSyncIcon()}
                  <span className="text-sm text-muted-foreground">{getSyncText()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-accent hover:bg-bright-accent text-background-dark hover:scale-105 transition-all duration-200 font-medium"
          >
            <Edit3 className="w-4 h-4" strokeWidth={2} />
            Edit
          </button>
        </div>

        {/* Note Content */}
        <div className="space-y-6">
          {/* Location */}
          {noteData.location && (
            <div className="bg-background-medium rounded-xl p-6 border border-background-medium">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary-accent" strokeWidth={2} />
                <h3 className="text-sm font-medium text-white">Location</h3>
              </div>
              <p className="text-gray-300">{noteData.location}</p>
            </div>
          )}

          {/* Tags */}
          {noteData.tags.length > 0 && (
            <div className="bg-background-medium rounded-xl p-6 border border-background-medium">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-primary-accent" strokeWidth={2} />
                <h3 className="text-sm font-medium text-white">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {noteData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-md bg-primary-accent/20 text-primary-accent text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="bg-background-medium rounded-xl p-6 border border-background-medium">
            <h3 className="text-sm font-medium text-white mb-4">Content</h3>
            <div className="prose prose-invert max-w-none">
              {noteData.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-300 leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}