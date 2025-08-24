import { useState } from 'react';
import { ArrowLeft, Search, Filter, Calendar, Clock, Tag } from 'lucide-react';
import { useNavigation } from './NavigationContext';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
  tags: string[];
  location?: string;
}

export default function SearchPage() {
  const { goBack, navigateTo } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Mock search results
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Project Planning Session',
      content: 'Discussed the new productivity app features and timeline. Need to focus on the calendar integration and user experience improvements.',
      date: 'August 13, 2025',
      time: '9:30 AM',
      tags: ['work', 'planning', 'productivity'],
      location: 'Conference Room A'
    },
    {
      id: '2',
      title: 'Design System Updates',
      content: 'Updated the color palette to include the new cyan accent colors. All components should now use the consistent dark theme.',
      date: 'August 12, 2025',
      time: '2:15 PM',
      tags: ['design', 'ui', 'colors'],
    },
    {
      id: '3',
      title: 'AI Integration Ideas',
      content: 'Brainstormed ways to integrate AI for smart note categorization and content suggestions. Could use NLP for automatic tagging.',
      date: 'August 11, 2025',
      time: '4:30 PM',
      tags: ['ai', 'features', 'brainstorm'],
    },
    {
      id: '4',
      title: 'Team Standup Notes',
      content: 'Blockers: API rate limiting issue. Achievements: Calendar view completed. Next: Work on note editing interface.',
      date: 'August 10, 2025',
      time: '10:00 AM',
      tags: ['meeting', 'team', 'standup'],
      location: 'Virtual - Zoom'
    },
    {
      id: '5',
      title: 'User Research Findings',
      content: 'Users want better search functionality and the ability to link notes together. Dark theme is highly requested.',
      date: 'August 9, 2025',
      time: '3:15 PM',
      tags: ['research', 'users', 'feedback'],
    }
  ];

  const availableTags = Array.from(new Set(mockResults.flatMap(result => result.tags)));

  const filteredResults = mockResults.filter(result => {
    // Text search
    const matchesSearch = searchQuery === '' || 
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    // Tag filter
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => result.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const handleResultClick = (result: SearchResult) => {
    // Navigate to the note view page to view this specific note
    navigateTo('note-view', { selectedNoteId: result.id });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-primary-accent/30 text-primary-accent rounded px-0.5">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-5xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={goBack}
            className="p-2 rounded-lg bg-background-medium hover:bg-primary-accent/20 text-white hover:text-primary-accent transition-all duration-200 hover:scale-110"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2} />
          </button>
          <h1 className="text-3xl font-semibold text-white">Search Notes</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-primary-accent" strokeWidth={2} />
          </div>
          <input
            type="text"
            placeholder="Search your thoughts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-background-medium text-white placeholder-muted-foreground rounded-xl border border-background-medium focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20 focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(20,184,166,0.2)]"
            autoFocus
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {/* Time Filters */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" strokeWidth={2} />
            <span className="text-sm text-muted-foreground">Time:</span>
            {(['all', 'today', 'week', 'month'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedFilter === filter
                    ? 'bg-primary-accent text-background-dark'
                    : 'bg-background-medium text-white hover:bg-background-medium/80'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tag Filters */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-muted-foreground" strokeWidth={2} />
            <span className="text-sm text-muted-foreground">Filter by tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-primary-accent text-background-dark'
                    : 'bg-background-medium text-white hover:bg-background-medium/80'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredResults.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background-medium flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No results found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
            </div>
          ) : (
            <>
              <div className="text-sm text-muted-foreground mb-4">
                {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'} found
              </div>
              {filteredResults.map((result) => (
                <div
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="bg-background-medium rounded-xl p-6 border border-background-medium hover:border-primary-accent/30 transition-all duration-300 cursor-pointer group"
                >
                  {/* Result Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-primary-accent">
                        <Calendar className="w-4 h-4" strokeWidth={2} />
                        <span className="text-sm font-medium">{result.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" strokeWidth={2} />
                        <span className="text-sm">{result.time}</span>
                      </div>
                      {result.location && (
                        <div className="text-muted-foreground text-sm">
                          📍 {result.location}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Result Content */}
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-white mb-2 group-hover:text-primary-accent transition-colors">
                      {highlightText(result.title, searchQuery)}
                    </h3>
                    <p className="text-gray-300 leading-relaxed line-clamp-2">
                      {highlightText(result.content, searchQuery)}
                    </p>
                  </div>

                  {/* Tags */}
                  {result.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {result.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded-md text-xs font-medium ${
                            selectedTags.includes(tag) || searchQuery.toLowerCase().includes(tag.toLowerCase())
                              ? 'bg-primary-accent/30 text-primary-accent'
                              : 'bg-background-dark/50 text-muted-foreground'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}