import React, { useRef, useEffect, useCallback, useState } from 'react';
import { planets, PlanetData } from '../data/planets';

interface SolarSystemCanvasProps {
  isPlaying: boolean;
  speed: number;
  onPlanetClick: (planet: PlanetData) => void;
  onSunClick: () => void;
}

interface PlanetState {
  angle: number;
  planet: PlanetData;
}

const SolarSystemCanvas: React.FC<SolarSystemCanvasProps> = ({ isPlaying, speed, onPlanetClick, onSunClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const planetStatesRef = useRef<PlanetState[]>([]);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const centerRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);

  // Initialize planet states
  useEffect(() => {
    planetStatesRef.current = planets.map((planet) => ({
      angle: Math.random() * Math.PI * 2,
      planet
    }));
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      setCanvasSize({ width, height });
      centerRef.current = { x: width / 2, y: height / 2 };
      
      // Scale orbits to fit screen
      const maxOrbit = 370;
      const availableSpace = Math.min(width, height) / 2 - 40;
      scaleRef.current = availableSpace / maxOrbit;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Draw stars background
  const drawStars = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Use a seeded random for consistent star positions
    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
      const x = ((i * 7919 + 1) % width);
      const y = ((i * 6271 + 3) % height);
      const size = ((i * 3571) % 3) * 0.5 + 0.5;
      const opacity = ((i * 4231) % 100) / 100 * 0.5 + 0.3;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
    }
  }, []);

  // Draw sun
  const drawSun = useCallback((ctx: CanvasRenderingContext2D, cx: number, cy: number) => {
    const scale = scaleRef.current;
    const sunRadius = 25 * scale;
    
    // Glow effect
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunRadius * 3);
    gradient.addColorStop(0, 'rgba(255, 220, 50, 0.4)');
    gradient.addColorStop(0.5, 'rgba(255, 160, 0, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
    ctx.beginPath();
    ctx.arc(cx, cy, sunRadius * 3, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Sun body
    const sunGradient = ctx.createRadialGradient(cx - sunRadius * 0.3, cy - sunRadius * 0.3, 0, cx, cy, sunRadius);
    sunGradient.addColorStop(0, '#fff7a0');
    sunGradient.addColorStop(0.4, '#ffdd00');
    sunGradient.addColorStop(0.8, '#ffaa00');
    sunGradient.addColorStop(1, '#ff6600');
    ctx.beginPath();
    ctx.arc(cx, cy, sunRadius, 0, Math.PI * 2);
    ctx.fillStyle = sunGradient;
    ctx.fill();
  }, []);

  // Draw orbit
  const drawOrbit = useCallback((ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, isHovered: boolean) => {
    const scale = scaleRef.current;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * scale, 0, Math.PI * 2);
    ctx.strokeStyle = isHovered ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = isHovered ? 1.5 : 0.5;
    ctx.stroke();
  }, []);

  // Draw planet
  const drawPlanet = useCallback((
    ctx: CanvasRenderingContext2D,
    planet: PlanetData,
    x: number,
    y: number,
    isHovered: boolean
  ) => {
    const scale = scaleRef.current;
    const size = planet.displaySize * scale;
    
    // Glow on hover
    if (isHovered) {
      const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
      glow.addColorStop(0, `${planet.color}60`);
      glow.addColorStop(1, `${planet.color}00`);
      ctx.beginPath();
      ctx.arc(x, y, size * 3, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
    }

    // Planet body
    const gradient = ctx.createRadialGradient(x - size * 0.3, y - size * 0.3, 0, x, y, size);
    gradient.addColorStop(0, `${planet.color}ff`);
    gradient.addColorStop(0.7, `${planet.color}cc`);
    gradient.addColorStop(1, `${planet.color}88`);
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Saturn's rings
    if (planet.id === 'saturn') {
      ctx.beginPath();
      ctx.ellipse(x, y, size * 2, size * 0.5, -0.3, 0, Math.PI * 2);
      ctx.strokeStyle = `${planet.color}aa`;
      ctx.lineWidth = 2 * scale;
      ctx.stroke();
    }

    // Label on hover
    if (isHovered) {
      ctx.font = `${12 * Math.max(scale, 0.8)}px sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.textAlign = 'center';
      ctx.fillText(planet.nameRu, x, y - size - 8);
    }
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const animate = (time: number) => {
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      const { width, height } = canvasSize;
      if (width === 0 || height === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const dpr = window.devicePixelRatio;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      // Clear
      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, width, height);

      // Stars
      drawStars(ctx, width, height);

      const cx = centerRef.current.x;
      const cy = centerRef.current.y;

      // Draw orbits
      planetStatesRef.current.forEach((state) => {
        const isHovered = hoveredPlanet === state.planet.id;
        drawOrbit(ctx, cx, cy, state.planet.orbitRadius, isHovered);
      });

      // Draw sun
      drawSun(ctx, cx, cy);

      // Update and draw planets
      if (isPlaying) {
        planetStatesRef.current.forEach((state) => {
          // Speed factor: Earth completes orbit in ~20 seconds at 1x speed
          const angularSpeed = (2 * Math.PI) / (state.planet.orbitalPeriod / 365 * 20);
          state.angle += angularSpeed * deltaTime * speed;
        });
      }

      planetStatesRef.current.forEach((state) => {
        const scale = scaleRef.current;
        const x = cx + Math.cos(state.angle) * state.planet.orbitRadius * scale;
        const y = cy + Math.sin(state.angle) * state.planet.orbitRadius * scale;
        const isHovered = hoveredPlanet === state.planet.id;
        drawPlanet(ctx, state.planet, x, y, isHovered);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, speed, canvasSize, hoveredPlanet, drawStars, drawSun, drawOrbit, drawPlanet]);

  // Mouse interaction
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const cx = centerRef.current.x;
    const cy = centerRef.current.y;
    const scale = scaleRef.current;

    let found = false;
    for (const state of planetStatesRef.current) {
      const x = cx + Math.cos(state.angle) * state.planet.orbitRadius * scale;
      const y = cy + Math.sin(state.angle) * state.planet.orbitRadius * scale;
      const hitRadius = Math.max(state.planet.displaySize * scale * 2, 12);
      const dist = Math.sqrt((mx - x) ** 2 + (my - y) ** 2);
      if (dist < hitRadius) {
        setHoveredPlanet(state.planet.id);
        canvas.style.cursor = 'pointer';
        found = true;
        break;
      }
    }

    // Check sun
    if (!found) {
      const sunRadius = 25 * scale;
      const distToSun = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
      if (distToSun < sunRadius * 1.5) {
        canvas.style.cursor = 'pointer';
        found = true;
      }
    }

    if (!found) {
      setHoveredPlanet(null);
      canvas.style.cursor = 'default';
    }
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const cx = centerRef.current.x;
    const cy = centerRef.current.y;
    const scale = scaleRef.current;

    // Check planets
    for (const state of planetStatesRef.current) {
      const x = cx + Math.cos(state.angle) * state.planet.orbitRadius * scale;
      const y = cy + Math.sin(state.angle) * state.planet.orbitRadius * scale;
      const hitRadius = Math.max(state.planet.displaySize * scale * 2, 12);
      const dist = Math.sqrt((mx - x) ** 2 + (my - y) ** 2);
      if (dist < hitRadius) {
        onPlanetClick(state.planet);
        return;
      }
    }

    // Check sun
    const sunRadius = 25 * scale;
    const distToSun = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
    if (distToSun < sunRadius * 1.5) {
      onSunClick();
    }
  }, [onPlanetClick, onSunClick]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    />
  );
};

export default SolarSystemCanvas;
