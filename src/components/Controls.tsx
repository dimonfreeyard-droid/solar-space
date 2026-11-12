import React from 'react';

interface ControlsProps {
  isPlaying: boolean;
  speed: number;
  onTogglePlay: () => void;
  onSpeedChange: (speed: number) => void;
}

const Controls: React.FC<ControlsProps> = ({ isPlaying, speed, onTogglePlay, onSpeedChange }) => {
  const speedOptions = [0.25, 0.5, 1, 2, 5, 10];

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/70 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/10">
      {/* Play/Pause Button */}
      <button
        onClick={onTogglePlay}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        title={isPlaying ? 'Пауза' : 'Воспроизведение'}
      >
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="3" y="2" width="4" height="12" rx="1" />
            <rect x="9" y="2" width="4" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2l10 6-10 6V2z" />
          </svg>
        )}
      </button>

      {/* Speed Control */}
      <div className="flex items-center gap-2">
        <span className="text-white/60 text-sm">Скорость:</span>
        <div className="flex gap-1">
          {speedOptions.map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                speed === s
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Controls;
