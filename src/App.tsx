import React, { useState } from 'react';
import SolarSystemCanvas from './components/SolarSystemCanvas';
import Controls from './components/Controls';
import PlanetInfo from './components/PlanetInfo';
import DeployGuide from './components/DeployGuide';
import { PlanetData } from './data/planets';

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [showSun, setShowSun] = useState(false);
  const [showDeployGuide, setShowDeployGuide] = useState(false);

  const handlePlanetClick = (planet: PlanetData) => {
    setSelectedPlanet(planet);
    setShowSun(false);
  };

  const handleSunClick = () => {
    setShowSun(true);
    setSelectedPlanet(null);
  };

  const handleCloseInfo = () => {
    setSelectedPlanet(null);
    setShowSun(false);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050510]">
      {/* Title */}
      <div className="absolute top-6 left-6 z-10">
        <h1 className="text-2xl font-bold text-white/90 tracking-wide">
          ☀️ Солнечная система
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Нажмите на планету или Солнце для подробной информации
        </p>
      </div>

      {/* Planet legend */}
      <div className="absolute top-6 left-6 mt-20 z-10 hidden md:block">
        <div className="bg-black/50 backdrop-blur-sm rounded-xl p-3 border border-white/5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {[
              { name: 'Меркурий', color: '#b5b5b5' },
              { name: 'Венера', color: '#e8cda0' },
              { name: 'Земля', color: '#4da6ff' },
              { name: 'Марс', color: '#e07050' },
              { name: 'Юпитер', color: '#d4a574' },
              { name: 'Сатурн', color: '#f0d890' },
              { name: 'Уран', color: '#7ec8e3' },
              { name: 'Нептун', color: '#4169e1' },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-white/60 text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="w-full h-full">
        <SolarSystemCanvas
          isPlaying={isPlaying}
          speed={speed}
          onPlanetClick={handlePlanetClick}
          onSunClick={handleSunClick}
        />
      </div>

      {/* Info Panel */}
      <PlanetInfo
        planet={selectedPlanet}
        showSun={showSun}
        onClose={handleCloseInfo}
      />

      {/* Deploy Guide Button */}
      <button
        onClick={() => setShowDeployGuide(true)}
        className="absolute bottom-6 right-6 z-10 flex items-center gap-2 bg-black/70 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all hover:bg-black/80 group"
        title="Как развернуть локально"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:rotate-12 transition-transform">
          <path d="M2 13l4-4m0 0l-1-4 4 1m-3 3l6-6m-6 6l1 4 4-1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-sm font-medium">Как запустить</span>
      </button>

      {/* Controls */}
      <Controls
        isPlaying={isPlaying}
        speed={speed}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onSpeedChange={setSpeed}
      />

      {/* Deploy Guide Modal */}
      <DeployGuide
        isOpen={showDeployGuide}
        onClose={() => setShowDeployGuide(false)}
      />
    </div>
  );
}

export default App;
