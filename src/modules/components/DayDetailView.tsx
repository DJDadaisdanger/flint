import { ArrowLeft, Plus, Clock, Edit3, Trash2 } from 'lucide-react';
import { useNavigation } from './NavigationContext';
import { useState } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
  time: string;
  tags: string[];
  location?: string;
}

export default function DayDetailView() {
  const { navigation, goBack, navigateTo } = useNavigation();
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [deleteNoteId, setDeleteNoteId] = useState<string | null>(null);
  
  const selectedDate = navigation.selectedDate || new Date();
  
  // Mock notes data for the selected day
  const mockNotes: Note[] = [
    {
      id: '1',
      title: 'Project Planning Session',
      content: 'Discussed the new productivity app features and timeline. Need to focus on the calendar integration and user experience improvements.',
      time: '9:30 AM',
      tags: ['work', 'planning', 'productivity'],
      location: 'Conference Room A'
    },
    {
      id: '2',
      title: 'Design System Updates',
      content: 'Updated the color palette to include the new cyan accent colors. All components should now use the consistent dark theme.',
      time: '2:15 PM',
      tags: ['design', 'ui', 'colors'],
    },
    {
      id: '3',
      title: 'Quick Thought',
      content: 'Remember to implement the search functionality with proper filtering and highlighting.',
      time: '4:45 PM',
      tags: ['idea', 'feature'],
    },
    {
      id: '4',
      title: 'Team Standup Notes',
      content: 'Blockers: API rate limiting issue. Achievements: Calendar view completed. Next: Work on note editing interface.',
      time: '10:00 AM',
      tags: ['meeting', 'team', 'standup'],
      location: 'Virtual - Zoom'
    }
  ];

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleEditNote = (noteId: string) => {
    navigateTo('note-view', { selectedNoteId: noteId });
  };

  const handleDeleteNote = (noteId: string) => {
    setDeleteNoteId(noteId);
  };

  const confirmDelete = () => {
    if (deleteNoteId) {
      console.log('Deleting note:', deleteNoteId);
      // In a real app, this would delete the note from the backend
      setDeleteNoteId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteNoteId(null);
  };

  const handleAddNewNote = () => {
    navigateTo('note-edit', { selectedDate });
  };

  const handleAddNote = () => {
    navigateTo('note-edit', { selectedDate });
    setIsAddingNote(false);
  };

  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={goBack}
              className="p-2 rounded-lg bg-background-medium hover:bg-primary-accent/20 text-white hover:text-primary-accent transition-all duration-200 hover:scale-110"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={2} />
            </button>
            <div>
              <h1 className="text-3xl font-semibold text-white">
                {formatDate(selectedDate)}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {mockNotes.length} {mockNotes.length === 1 ? 'note' : 'notes'} recorded
              </p>
            </div>
          </div>
          
          <button
            onClick={handleAddNewNote}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-accent hover:bg-bright-accent text-background-dark hover:scale-105 transition-all duration-200 font-medium"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            New Note
          </button>
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          {mockNotes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background-medium flex items-center justify-center">
                <Plus className="w-8 h-8 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No notes yet</h3>
              <p className="text-muted-foreground mb-4">Start capturing your thoughts for this day</p>
              <button
                onClick={handleAddNewNote}
                className="px-4 py-2 rounded-lg bg-primary-accent hover:bg-bright-accent text-background-dark hover:scale-105 transition-all duration-200 font-medium"
              >
                Add your first note
              </button>
            </div>
          ) : (
            mockNotes.map((note) => (
              <div
                key={note.id}
                className="bg-background-medium rounded-xl p-6 border border-background-medium hover:border-primary-accent/30 transition-all duration-300 group"
              >
                {/* Note Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-primary-accent">
                      <Clock className="w-4 h-4" strokeWidth={2} />
                      <span className="text-sm font-medium">{note.time}</span>
                    </div>
                    {note.location && (
                      <div className="text-muted-foreground text-sm">
                        📍 {note.location}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditNote(note.id)}
                      className="p-1.5 rounded-md hover:bg-background-dark text-white hover:text-primary-accent transition-colors"
                    >
                      <Edit3 className="w-4 h-4" strokeWidth={2} />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-1.5 rounded-md hover:bg-background-dark text-white hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={2} />
                    </button>
                  </div>
                </div>

                {/* Note Content */}
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-white mb-2">{note.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{note.content}</p>
                </div>

                {/* Tags */}
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-md bg-primary-accent/20 text-primary-accent text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteNoteId && (
        <div className="fixed inset-0 bg-background-dark/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-background-medium rounded-xl p-6 border border-background-medium max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-white mb-2">Delete Note</h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete this note? This action cannot be undone.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-lg bg-background-dark hover:bg-background-dark/80 text-white transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}