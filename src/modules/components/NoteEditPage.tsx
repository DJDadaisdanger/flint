import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Cloud, CloudOff, MapPin, Mic, MicOff, Plus, X } from 'lucide-react';
import { useNavigation } from './NavigationContext';

interface NoteData {
  id?: string;
  title: string;
  content: string;
  tags: string[];
  location: string;
  recordLocation: boolean;
  isRecording: boolean;
}

export default function NoteEditPage() {
  const { navigation, goBack } = useNavigation();
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline'>('synced');
  const [newTag, setNewTag] = useState('');
  
  const [noteData, setNoteData] = useState<NoteData>({
    title: '',
    content: '',
    tags: [],
    location: '',
    recordLocation: true,
    isRecording: false
  });

  const isEditing = !!navigation.selectedNoteId;
  const selectedDate = navigation.selectedDate || new Date();

  // Mock loading existing note data if editing
  useEffect(() => {
    if (isEditing && navigation.selectedNoteId) {
      // In a real app, this would fetch the note data
      setNoteData({
        title: 'Design System Updates',
        content: 'Updated the color palette to include the new cyan accent colors. All components should now use the consistent dark theme.\n\nKey changes:\n- Background dark: #0a0a0a\n- Primary accent: #14b8a6\n- Consistent spacing using 8px grid\n\nNext steps:\n- Update documentation\n- Review component library\n- Test across different devices',
        tags: ['design', 'ui', 'colors'],
        location: 'Home Office',
        recordLocation: true,
        isRecording: false
      });
    }
  }, [isEditing, navigation.selectedNoteId]);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleSave = () => {
    setSyncStatus('syncing');
    
    // Simulate saving
    setTimeout(() => {
      setSyncStatus('synced');
      console.log('Note saved:', noteData);
      goBack();
    }, 1500);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !noteData.tags.includes(newTag.trim().toLowerCase())) {
      setNoteData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim().toLowerCase()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNoteData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTag();
    }
  };

  const toggleRecording = () => {
    setNoteData(prev => ({
      ...prev,
      isRecording: !prev.isRecording
    }));
  };

  const getSyncIcon = () => {
    switch (syncStatus) {
      case 'synced':
        return <Cloud className="w-4 h-4 text-primary-accent" strokeWidth={2} />;
      case 'syncing':
        return <Cloud className="w-4 h-4 text-yellow-400 animate-pulse" strokeWidth={2} />;
      case 'offline':
        return <CloudOff className="w-4 h-4 text-red-400" strokeWidth={2} />;
    }
  };

  const getSyncText = () => {
    switch (syncStatus) {
      case 'synced':
        return 'Synced';
      case 'syncing':
        return 'Syncing...';
      case 'offline':
        return 'Offline';
    }
  };

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
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Note title..."
                  value={noteData.title}
                  onChange={(e) => setNoteData(prev => ({ ...prev, title: e.target.value }))}
                  className="text-2xl font-semibold text-white bg-transparent border-none outline-none placeholder-muted-foreground min-w-0 flex-1"
                />
              </div>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-muted-foreground text-sm">
                  {formatDate(selectedDate)}
                </p>
                <div className="flex items-center gap-2">
                  {getSyncIcon()}
                  <span className="text-sm text-muted-foreground">{getSyncText()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleSave}
            disabled={syncStatus === 'syncing'}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-accent hover:bg-bright-accent text-background-dark hover:scale-105 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" strokeWidth={2} />
            {syncStatus === 'syncing' ? 'Saving...' : 'Save'}
          </button>
        </div>

        {/* Note Fields */}
        <div className="space-y-6">
          {/* Tags */}
          <div className="bg-background-medium rounded-xl p-6 border border-background-medium">
            <label className="block text-sm font-medium text-white mb-3">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {noteData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 px-3 py-1 rounded-md bg-primary-accent/20 text-primary-accent text-sm font-medium"
                >
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-red-400 transition-colors"
                  >
                    <X className="w-3 h-3" strokeWidth={2} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-3 py-2 bg-background-dark text-white placeholder-muted-foreground rounded-lg border border-background-dark focus:border-primary-accent focus:ring-1 focus:ring-primary-accent/20 focus:outline-none transition-all"
              />
              <button
                onClick={handleAddTag}
                className="px-3 py-2 rounded-lg bg-background-dark hover:bg-primary-accent/20 text-white hover:text-primary-accent transition-all"
              >
                <Plus className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Location Settings */}
          <div className="bg-background-medium rounded-xl p-6 border border-background-medium">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-white">Location</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Record location</span>
                <button
                  onClick={() => setNoteData(prev => ({ ...prev, recordLocation: !prev.recordLocation }))}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    noteData.recordLocation ? 'bg-primary-accent' : 'bg-background-dark'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      noteData.recordLocation ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            {noteData.recordLocation && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-accent" strokeWidth={2} />
                <input
                  type="text"
                  placeholder="Current location..."
                  value={noteData.location}
                  onChange={(e) => setNoteData(prev => ({ ...prev, location: e.target.value }))}
                  className="flex-1 px-3 py-2 bg-background-dark text-white placeholder-muted-foreground rounded-lg border border-background-dark focus:border-primary-accent focus:ring-1 focus:ring-primary-accent/20 focus:outline-none transition-all"
                />
                <button
                  onClick={() => {
                    // In a real app, this would get the current location from the browser's geolocation API
                    setNoteData(prev => ({ ...prev, location: 'Current Location' }));
                    console.log('Getting current location...');
                  }}
                  className="group relative p-2 rounded-lg bg-background-dark hover:bg-primary-accent/20 text-white hover:text-primary-accent transition-all"
                  title="Get current location"
                >
                  <MapPin className="w-4 h-4" strokeWidth={2} />
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-background-medium text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap border border-primary-accent/20 z-50">
                    Get current location
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-t-[4px] border-t-background-medium border-x-[4px] border-x-transparent"></div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Voice Recording */}
          <div className="bg-background-medium rounded-xl p-6 border border-background-medium">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${noteData.isRecording ? 'bg-red-500/20' : 'bg-background-dark'}`}>
                  {noteData.isRecording ? (
                    <Mic className="w-5 h-5 text-red-400" strokeWidth={2} />
                  ) : (
                    <MicOff className="w-5 h-5 text-muted-foreground" strokeWidth={2} />
                  )}
                </div>
                <div>
                  <span className="text-sm font-medium text-white">
                    {noteData.isRecording ? 'Recording...' : 'Voice Recording'}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {noteData.isRecording ? 'Tap to stop recording' : 'Tap to start voice recording'}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleRecording}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  noteData.isRecording
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-primary-accent hover:bg-bright-accent text-background-dark'
                }`}
              >
                {noteData.isRecording ? 'Stop' : 'Record'}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-background-medium rounded-xl p-6 border border-background-medium">
            <label className="block text-sm font-medium text-white mb-3">Content</label>
            <textarea
              placeholder="Start writing your thoughts..."
              value={noteData.content}
              onChange={(e) => setNoteData(prev => ({ ...prev, content: e.target.value }))}
              rows={12}
              className="w-full px-4 py-3 bg-background-dark text-white placeholder-muted-foreground rounded-lg border border-background-dark focus:border-primary-accent focus:ring-1 focus:ring-primary-accent/20 focus:outline-none transition-all resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}