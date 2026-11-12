import React from 'react';
import { PlanetData, sunData } from '../data/planets';

interface PlanetInfoProps {
  planet: PlanetData | null;
  showSun: boolean;
  onClose: () => void;
}

const PlanetInfo: React.FC<PlanetInfoProps> = ({ planet, showSun, onClose }) => {
  if (!planet && !showSun) return null;

  if (showSun) {
    return (
      <div className="absolute top-6 right-6 w-80 bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-2xl shadow-yellow-500/10 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
        >
          ✕
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-orange-500 shadow-lg shadow-yellow-500/50" />
          <div>
            <h2 className="text-xl font-bold text-yellow-300">{sunData.name}</h2>
            <p className="text-white/50 text-xs">Звезда</p>
          </div>
        </div>
        <p className="text-white/80 text-sm mb-4">{sunData.description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Радиус:</span>
            <span className="text-white font-medium">{sunData.radius.toLocaleString()} км</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Тип:</span>
            <span className="text-white font-medium">Жёлтый карлик (G2V)</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Температура поверхности:</span>
            <span className="text-white font-medium">~5 500 °C</span>
          </div>
        </div>
      </div>
    );
  }

  if (!planet) return null;

  return (
    <div className="absolute top-6 right-6 w-80 bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl animate-fade-in">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
      >
        ✕
      </button>
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-full shadow-lg"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${planet.color}dd, ${planet.color}88, ${planet.color}44)`,
            boxShadow: `0 0 20px ${planet.color}40`
          }}
        />
        <div>
          <h2 className="text-xl font-bold text-white">{planet.nameRu}</h2>
          <p className="text-white/50 text-xs">{planet.name}</p>
        </div>
      </div>
      <p className="text-white/80 text-sm mb-4">{planet.description}</p>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/50">Радиус:</span>
          <span className="text-white font-medium">{planet.radius.toLocaleString()} км</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/50">Расстояние от Солнца:</span>
          <span className="text-white font-medium">{planet.distanceFromSun} млн км</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/50">Орбитальный период:</span>
          <span className="text-white font-medium">
            {planet.orbitalPeriod >= 365
              ? `${(planet.orbitalPeriod / 365.25).toFixed(1)} лет`
              : `${planet.orbitalPeriod} дней`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/50">Сравнение с Землёй:</span>
          <span className="text-white font-medium">
            {(planet.radius / 6371).toFixed(2)}x
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlanetInfo;
