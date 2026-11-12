import React, { useState } from 'react';
import SolarSystemCanvas from './components/SolarSystemCanvas';
import Controls from './components/Controls';
import PlanetInfo from './components/PlanetInfo';
import { PlanetData } from './data/planets';

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [showSun, setShowSun] = useState(false);

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

      {/* Controls */}
      <Controls
        isPlaying={isPlaying}
        speed={speed}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onSpeedChange={setSpeed}
      />
    </div>
  );
}

export default App;
