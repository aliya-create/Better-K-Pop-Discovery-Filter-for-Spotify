import React, { useState, useEffect } from 'react';
import { Heart, Plus, UserPlus, ChevronDown, Music, Sparkles, Mic, Trophy, Camera, Shuffle, Users, Star } from 'lucide-react';

const KPopDiscovery = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [savedTracks, setSavedTracks] = useState(new Set());
  const [filters, setFilters] = useState({
    era: 'all',
    concept: 'all',
    groupType: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [startY, setStartY] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [particles, setParticles] = useState([]);
  const [questProgress, setQuestProgress] = useState(0);
  const [showQuest, setShowQuest] = useState(true);
  const [showVoice, setShowVoice] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showMoodWheel, setShowMoodWheel] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [showLyrics, setShowLyrics] = useState(false);
  const [sessionStats, setSessionStats] = useState({ saves: 0, swipes: 0 });
  const [showStats, setShowStats] = useState(false);

  const tracks = [
    {
      id: 1,
      title: "Rush Hour",
      artist: "Monsta X",
      era: "3rd",
      concept: "dark",
      groupType: "boy",
      image: "https://i.scdn.co/image/ab67616d0000b273c8b3df8e9eb6f5f96b9b1e11",
      artistPhoto: "https://i.scdn.co/image/ab6761610000e5eb739897b2c222c4564e5d57d9",
      color: "#1a1a2e",
      lyrics: "Rush hour 속 우린 / In the rush hour we are / 서로를 찾아가 / Finding each other"
    },
    {
      id: 2,
      title: "MANIAC",
      artist: "Stray Kids",
      era: "4th",
      concept: "dark",
      groupType: "boy",
      image: "https://i.scdn.co/image/ab67616d0000b273c0ddb8326b284fe0f543e27d",
      artistPhoto: "https://i.scdn.co/image/ab6761610000e5eb619d85b4f1fbździe23e6d8a6f",
      color: "#8B0000",
      lyrics: "Maniac 누가 봐도 / Maniac anyone can see / 미친놈 하나 / One crazy person"
    },
    {
      id: 3,
      title: "Maria",
      artist: "Hwasa",
      era: "3rd",
      concept: "healing",
      groupType: "solo",
      image: "https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70cd6e8a9",
      artistPhoto: "https://i.scdn.co/image/ab6761610000e5eb4c8f1a90f4f27e644c866e32",
      color: "#4a0e4e",
      lyrics: "Maria 나를 믿어 / Maria believe in me / 사랑한 적 없던 사람처럼 / Like someone who never loved"
    },
    {
      id: 4,
      title: "Gambler",
      artist: "Monsta X",
      era: "3rd",
      concept: "performance",
      groupType: "boy",
      image: "https://i.scdn.co/image/ab67616d0000b2732be6f2a8c1dee38e0aa54ed4",
      artistPhoto: "https://i.scdn.co/image/ab6761610000e5eb739897b2c222c4564e5d57d9",
      color: "#c41e3a",
      lyrics: "All in 전부 걸어 / All in betting everything / 판을 뒤집어 / Flip the table"
    },
    {
      id: 5,
      title: "Sherlock",
      artist: "SHINee",
      era: "2nd",
      concept: "performance",
      groupType: "boy",
      image: "https://i.scdn.co/image/ab67616d0000b2737b2a191ee8bd10475a2b3f8a",
      artistPhoto: "https://i.scdn.co/image/ab6761610000e5eb2f854dfb0e634f9a8ec1e894",
      color: "#0f4c81",
      lyrics: "SHINee's back / SHINee's back / Everybody"
    },
    {
      id: 6,
      title: "God's Menu",
      artist: "Stray Kids",
      era: "4th",
      concept: "performance",
      groupType: "boy",
      image: "https://i.scdn.co/image/ab67616d0000b273a7eb00c2e68c04e6f32cd21d",
      artistPhoto: "https://i.scdn.co/image/ab6761610000e5eb619d85b4f1fb56ძie23e6d8a6f",
      color: "#d4af37",
      lyrics: "Cooking a sauce 입맛대로 / Cooking a sauce as you like / Taste so good"
    },
    {
      id: 7,
      title: "View",
      artist: "SHINee",
      era: "2nd",
      concept: "bright",
      groupType: "boy",
      image: "https://i.scdn.co/image/ab67616d0000b2733e9c5b3e07f3ea9f3f6e6e88",
      artistPhoto: "https://i.scdn.co/image/ab6761610000e5eb2f854dfb0e634f9a8ec1e894",
      color: "#87ceeb",
      lyrics: "If you wanna / 정말 원한다면 / If you really want / 시작해 둘만의 view"
    },
    {
      id: 8,
      title: "Hero",
      artist: "Monsta X",
      era: "3rd",
      concept: "dark",
      groupType: "boy",
      image: "https://i.scdn.co/image/ab67616d0000b273f4d0e114e5a698e0e94e7f11",
      artistPhoto: "https://i.scdn.co/image/ab6761610000e5eb739897b2c222c4564e5d57d9",
      color: "#2c3e50",
      lyrics: "Hero 날 구해줘 / Hero save me / 시간이 없어"
    }
  ];

  const moodWheelOptions = [
    { era: '2nd', concept: 'bright', groupType: 'boy', label: '2nd Gen Bright' },
    { era: '3rd', concept: 'dark', groupType: 'boy', label: '3rd Gen Dark' },
    { era: '4th', concept: 'performance', groupType: 'boy', label: '4th Gen Performance' },
    { era: '3rd', concept: 'healing', groupType: 'solo', label: 'Healing Solo' },
    { era: 'all', concept: 'all', groupType: 'all', label: 'Surprise Me!' }
  ];

  const filteredTracks = tracks.filter(track => {
    if (filters.era !== 'all' && track.era !== filters.era) return false;
    if (filters.concept !== 'all' && track.concept !== filters.concept) return false;
    if (filters.groupType !== 'all' && track.groupType !== filters.groupType) return false;
    return true;
  });

  const currentTrackData = filteredTracks[currentTrack];

  const createParticles = (x, y, concept) => {
    const colors = {
      dark: ['#8B0000', '#1a1a2e', '#4B0082'],
      bright: ['#FFD700', '#FF69B4', '#00CED1'],
      healing: ['#9370DB', '#DDA0DD', '#E6E6FA'],
      performance: ['#FF4500', '#FFD700', '#FF1493']
    };
    
    const particleColors = colors[concept] || colors.dark;
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      angle: (Math.PI * 2 * i) / 20,
      velocity: 2 + Math.random() * 3
    }));
    
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);
  };

  const handleSwipe = (direction) => {
    if (direction === 'up' && currentTrack < filteredTracks.length - 1) {
      setCurrentTrack(currentTrack + 1);
      setIsFlipped(false);
      setShowLyrics(false);
      setSessionStats(prev => ({ ...prev, swipes: prev.swipes + 1 }));
    } else if (direction === 'down' && currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
      setIsFlipped(false);
      setShowLyrics(false);
      setSessionStats(prev => ({ ...prev, swipes: prev.swipes + 1 }));
    }
  };

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    const currentY = e.touches[0].clientY;
    setDragY(currentY - startY);
  };

  const handleTouchEnd = () => {
    if (Math.abs(dragY) > 50) {
      if (dragY < 0) handleSwipe('up');
      else handleSwipe('down');
    }
    setDragY(0);
  };

  const toggleSave = (trackId, e) => {
    const newSaved = new Set(savedTracks);
    if (newSaved.has(trackId)) {
      newSaved.delete(trackId);
    } else {
      newSaved.add(trackId);
      const rect = e.currentTarget.getBoundingClientRect();
      createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, currentTrackData.concept);
      setQuestProgress(prev => Math.min(prev + 1, 10));
      setSessionStats(prev => ({ ...prev, saves: prev.saves + 1 }));
      
      if (navigator.vibrate) {
        navigator.vibrate([50, 30, 50]);
      }
    }
    setSavedTracks(newSaved);
  };

  const updateFilter = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
    setCurrentTrack(0);
    setShowFilters(false);
  };

  const handleVoiceSearch = () => {
    setShowVoice(true);
    setIsListening(true);
    setVoiceText('Listening...');
    
    setTimeout(() => {
      const commands = [
        { text: 'Show me 4th gen healing solos', filters: { era: '4th', concept: 'healing', groupType: 'solo' } },
        { text: 'Dark concept boy groups', filters: { era: 'all', concept: 'dark', groupType: 'boy' } },
        { text: '3rd gen performance tracks', filters: { era: '3rd', concept: 'performance', groupType: 'all' } }
      ];
      
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      setVoiceText(`"${randomCommand.text}"`);
      setIsListening(false);
      
      setTimeout(() => {
        setFilters(randomCommand.filters);
        setCurrentTrack(0);
        setShowVoice(false);
        setVoiceText('');
      }, 1500);
    }, 2000);
  };

  const spinMoodWheel = () => {
    const spins = 5 + Math.random() * 3;
    const targetRotation = spins * 360 + Math.random() * 360;
    setWheelRotation(targetRotation);
    
    setTimeout(() => {
      const selectedIndex = Math.floor((targetRotation % 360) / 72);
      const selected = moodWheelOptions[selectedIndex];
      setFilters(selected);
      setCurrentTrack(0);
      setShowMoodWheel(false);
      setWheelRotation(0);
    }, 3000);
  };

  const activeFiltersCount = Object.values(filters).filter(f => f !== 'all').length;

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden relative">
      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            animation: 'particleExplode 1s ease-out forwards'
          }}
        >
          <div 
            className="w-3 h-3 rounded-full"
            style={{ 
              backgroundColor: particle.color,
              transform: `translate(${Math.cos(particle.angle) * particle.velocity * 50}px, ${Math.sin(particle.angle) * particle.velocity * 50}px)`
            }}
          />
        </div>
      ))}

      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-gradient-to-b from-black to-transparent z-20">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-green-500" />
          <h1 className="text-xl font-bold">K-Pop Discovery</h1>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowStats(!showStats)}
            className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors"
          >
            <Trophy className="w-5 h-5 text-yellow-500" />
          </button>
          <button 
            onClick={handleVoiceSearch}
            className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors"
          >
            <Mic className="w-5 h-5 text-blue-400" />
          </button>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-full hover:bg-zinc-700 transition-colors relative"
          >
            <span className="text-sm">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Stats Modal */}
      {showStats && (
        <div className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center p-6">
          <div className="bg-zinc-900 rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Session Stats</h2>
              <button onClick={() => setShowStats(false)} className="text-zinc-400">✕</button>
            </div>
            <div className="space-y-4">
              <div className="bg-zinc-800 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-6 h-6 text-green-500 fill-current" />
                  <span className="text-2xl font-bold">{sessionStats.saves}</span>
                </div>
                <p className="text-zinc-400 text-sm">Tracks Saved</p>
              </div>
              <div className="bg-zinc-800 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Music className="w-6 h-6 text-purple-500" />
                  <span className="text-2xl font-bold">{sessionStats.swipes}</span>
                </div>
                <p className="text-zinc-400 text-sm">Tracks Explored</p>
              </div>
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-6 h-6 text-yellow-300 fill-current" />
                  <span className="text-2xl font-bold">
                    {filters.era !== 'all' ? filters.era + ' Gen ' : ''}
                    {filters.concept !== 'all' ? filters.concept : 'Multi-Stan'}
                  </span>
                </div>
                <p className="text-white/80 text-sm">Your Bias Era</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Voice Search Modal */}
      {showVoice && (
        <div className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ${isListening ? 'animate-pulse' : ''}`}>
              <Mic className="w-12 h-12" />
            </div>
            <p className="text-2xl font-bold mb-2">{voiceText}</p>
            <p className="text-zinc-400">Try: "Show me 4th gen healing solos"</p>
          </div>
        </div>
      )}

      {/* Mood Wheel Modal */}
      {showMoodWheel && (
        <div className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Spin the Mood Wheel!</h3>
            <div 
              className="w-64 h-64 mx-auto mb-6 relative"
              style={{ 
                transform: `rotate(${wheelRotation}deg)`,
                transition: 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)'
              }}
            >
              {moodWheelOptions.map((option, i) => (
                <div
                  key={i}
                  className="absolute w-full h-full"
                  style={{ 
                    transform: `rotate(${i * 72}deg)`,
                    transformOrigin: 'center'
                  }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-green-500 to-blue-500 rounded-t-full flex items-start justify-center pt-4">
                    <span className="text-xs font-bold text-center">{option.label}</span>
                  </div>
                </div>
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full border-4 border-white" />
              </div>
            </div>
            <button
              onClick={spinMoodWheel}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full font-bold text-lg"
            >
              Spin!
            </button>
            <button
              onClick={() => setShowMoodWheel(false)}
              className="block mx-auto mt-4 text-zinc-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Daily Quest */}
      {showQuest && questProgress < 10 && (
        <div className="mx-4 mb-2 bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5" />
            <div>
              <p className="font-bold text-sm">Daily Quest</p>
              <p className="text-xs opacity-90">Save 10 tracks for a photocard badge</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-bold">{questProgress}/10</div>
            <button onClick={() => setShowQuest(false)} className="text-white/70">✕</button>
          </div>
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-zinc-900 p-4 space-y-4 z-20 border-b border-zinc-800">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">Discovery Filters</h3>
            <button
              onClick={() => setShowMoodWheel(true)}
              className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm"
            >
              <Shuffle className="w-4 h-4" />
              Mood Wheel
            </button>
          </div>
          
          <div>
            <label className="text-xs text-zinc-400 mb-2 block">ERA</label>
            <div className="flex gap-2 flex-wrap">
              {['all', '2nd', '3rd', '4th'].map(era => (
                <button
                  key={era}
                  onClick={() => updateFilter('era', era)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    filters.era === era 
                      ? 'bg-green-500 text-black font-bold' 
                      : 'bg-zinc-800 hover:bg-zinc-700'
                  }`}
                >
                  {era === 'all' ? 'All Eras' : `${era} Gen`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 mb-2 block">CONCEPT</label>
            <div className="flex gap-2 flex-wrap">
              {['all', 'dark', 'bright', 'healing', 'performance'].map(concept => (
                <button
                  key={concept}
                  onClick={() => updateFilter('concept', concept)}
                  className={`px-4 py-2 rounded-full text-sm capitalize transition-colors ${
                    filters.concept === concept 
                      ? 'bg-green-500 text-black font-bold' 
                      : 'bg-zinc-800 hover:bg-zinc-700'
                  }`}
                >
                  {concept === 'all' ? 'All Concepts' : concept}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 mb-2 block">GROUP TYPE</label>
            <div className="flex gap-2 flex-wrap">
              {['all', 'boy', 'girl', 'solo'].map(type => (
                <button
                  key={type}
                  onClick={() => updateFilter('groupType', type)}
                  className={`px-4 py-2 rounded-full text-sm capitalize transition-colors ${
                    filters.groupType === type 
                      ? 'bg-green-500 text-black font-bold' 
                      : 'bg-zinc-800 hover:bg-zinc-700'
                  }`}
                >
                  {type === 'all' ? 'All Types' : `${type} ${type === 'solo' ? '' : 'group'}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Track Display */}
      <div 
        className="flex-1 relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {filteredTracks.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-8">
              <Music className="w-16 h-16 mx-auto mb-4 text-zinc-600" />
              <p className="text-zinc-400">No tracks match your filters</p>
              <button 
                onClick={() => setFilters({ era: 'all', concept: 'all', groupType: 'all' })}
                className="mt-4 px-6 py-2 bg-green-500 text-black rounded-full font-semibold hover:bg-green-400 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Background gradient */}
            <div 
              className="absolute inset-0 transition-all duration-500"
              style={{
                background: `linear-gradient(to bottom, ${currentTrackData.color}40 0%, black 60%)`
              }}
            />

            {/* Photocard Flip Container */}
            <div 
              className="relative h-full flex items-center justify-center p-6"
              style={{
                transform: `translateY(${dragY * 0.5}px)`,
                transition: dragY === 0 ? 'transform 0.3s ease' : 'none'
              }}
            >
              <div className="w-full max-w-md">
                {/* Flippable Card */}
                <div 
                  className="relative mb-6 cursor-pointer"
                  style={{
                    perspective: '1000px',
                    height: '420px'
                  }}
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-700"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                  >
                    {/* Front - Album Art */}
                    <div
                      className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <img 
                        src={currentTrackData.image}
                        alt={currentTrackData.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <span className="bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                          {currentTrackData.era === '2nd' ? '2nd' : currentTrackData.era === '3rd' ? '3rd' : '4th'} Gen
                        </span>
                        <span className="bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold capitalize">
                          {currentTrackData.concept}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm p-3 rounded-xl">
                        <p className="text-xs text-zinc-300 mb-1">Tap to flip for photocard</p>
                        <div className="flex items-center gap-2">
                          <Camera className="w-4 h-4 text-green-400" />
                          <span className="text-sm font-semibold">Artist Photo Inside</span>
                        </div>
                      </div>
                    </div>

                    {/* Back - Artist Photocard */}
                    <div
                      className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <div className="relative h-full flex flex-col">
                        <img 
                          src={currentTrackData.artistPhoto}
                          alt={currentTrackData.artist}
                          className="w-full h-3/4 object-cover"
                        />
                        <div className="flex-1 p-4 bg-gradient-to-t from-black to-transparent flex flex-col justify-end">
                          <div className="bg-black/80 backdrop-blur-sm p-3 rounded-xl">
                            <p className="text-sm font-bold mb-1">{currentTrackData.artist}</p>
                            <div className="flex gap-2 flex-wrap">
                              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                                {currentTrackData.concept} Concept
                              </span>
                              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                                {currentTrackData.era} Gen {currentTrackData.groupType} Group
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lyrics Card */}
                {showLyrics && (
                  <div className="mb-4 bg-zinc-900/95 backdrop-blur-sm p-4 rounded-xl border border-zinc-700">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-sm">Lyrics Preview</h4>
                      <button onClick={() => setShowLyrics(false)} className="text-zinc-400">✕</button>
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-line text-zinc-300">
                      {currentTrackData.lyrics}
                    </p>
                  </div>
                )}

                {/* Track Info */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2">{currentTrackData.title}</h2>
                  <p className="text-xl text-zinc-400">{currentTrackData.artist}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-around mb-4">
                  <button 
                    onClick={(e) => toggleSave(currentTrackData.id, e)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                      savedTracks.has(currentTrackData.id)
                        ? 'bg-green-500 text-black scale-110'
                        : 'bg-zinc-800 hover:bg-zinc-700'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${savedTracks.has(currentTrackData.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button className="w-14 h-14 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors">
                    <Plus className="w-6 h-6" />
                  </button>
                  <button className="w-14 h-14 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors">
                    <UserPlus className="w-6 h-6" />
                  </button>
                </div>

                {/* Gesture Hints */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button 
                    onClick={() => setShowLyrics(!showLyrics)}
                    className="bg-zinc-800 p-3 rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-zinc-700 transition-colors"
                  >
                    <Music className="w-4 h-4" />
                    {showLyrics ? 'Hide' : 'Show'} Lyrics
                  </button>
                  <button 
                    onClick={() => {
                      const similar = tracks.filter(t => 
                        t.era === currentTrackData.era && 
                        t.concept === currentTrackData.concept &&
                        t.id !== currentTrackData.id
                      );
                      if (similar.length > 0) {
                        const nextIndex = filteredTracks.findIndex(t => t.id === similar[0].id);
                        if (nextIndex !== -1) setCurrentTrack(nextIndex);
                      }
                    }}
                    className="bg-zinc-800 p-3 rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-zinc-700 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    Similar Era
                  </button>
                </div>

                {/* Track Counter */}
                <div className="text-center text-sm text-zinc-500">
                  {currentTrack + 1} of {filteredTracks.length} tracks
                </div>
              </div>
            </div>

            {/* Swipe Indicator */}
            <div className="absolute bottom-24 left-0 right-0 text-center">
              <p className="text-xs text-zinc-500 animate-pulse">
                Swipe up/down • Tap card to flip • Double-tap for lyrics
              </p>
            </div>
          </>
        )}
      </div>

      {/* Navigation Dots */}
      {filteredTracks.length > 0 && (
        <div className="p-4 flex justify-center gap-2">
          {filteredTracks.slice(0, 8).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentTrack(idx);
                setIsFlipped(false);
                setShowLyrics(false);
              }}
              className={`transition-all ${
                idx === currentTrack 
                  ? 'w-8 h-2 bg-green-500 rounded-full' 
                  : 'w-2 h-2 bg-zinc-700 rounded-full hover:bg-zinc-600'
              }`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes particleExplode {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0);
          }
        }
      `}</style>
    </div>
  );
};

export default KPopDiscovery;
