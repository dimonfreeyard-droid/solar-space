export interface PlanetData {
  id: string;
  name: string;
  nameRu: string;
  radius: number; // km
  distanceFromSun: number; // million km
  orbitalPeriod: number; // Earth days
  color: string;
  orbitRadius: number; // pixels for display
  displaySize: number; // pixels for display
  description: string;
}

export const planets: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    nameRu: 'Меркурий',
    radius: 2439,
    distanceFromSun: 57.9,
    orbitalPeriod: 88,
    color: '#b5b5b5',
    orbitRadius: 60,
    displaySize: 4,
    description: 'Самая маленькая и ближайшая к Солнцу планета. Поверхность покрыта кратерами.'
  },
  {
    id: 'venus',
    name: 'Venus',
    nameRu: 'Венера',
    radius: 6052,
    distanceFromSun: 108.2,
    orbitalPeriod: 225,
    color: '#e8cda0',
    orbitRadius: 90,
    displaySize: 6,
    description: 'Самая горячая планета из-за парникового эффекта. Вращается в обратном направлении.'
  },
  {
    id: 'earth',
    name: 'Earth',
    nameRu: 'Земля',
    radius: 6371,
    distanceFromSun: 149.6,
    orbitalPeriod: 365,
    color: '#4da6ff',
    orbitRadius: 125,
    displaySize: 7,
    description: 'Наш дом. Единственная известная планета с жизнью. Имеет один естественный спутник — Луну.'
  },
  {
    id: 'mars',
    name: 'Mars',
    nameRu: 'Марс',
    radius: 3390,
    distanceFromSun: 227.9,
    orbitalPeriod: 687,
    color: '#e07050',
    orbitRadius: 160,
    displaySize: 5,
    description: 'Красная планета. Имеет самый большой вулкан в Солнечной системе — Олимп.'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    nameRu: 'Юпитер',
    radius: 69911,
    distanceFromSun: 778.5,
    orbitalPeriod: 4333,
    color: '#d4a574',
    orbitRadius: 210,
    displaySize: 14,
    description: 'Самая большая планета. Газовый гигант с Большим Красным Пятном — гигантским штормом.'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    nameRu: 'Сатурн',
    radius: 58232,
    distanceFromSun: 1434,
    orbitalPeriod: 10759,
    color: '#f0d890',
    orbitRadius: 265,
    displaySize: 12,
    description: 'Известен своими великолепными кольцами из льда и камней. Вторая по величине планета.'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    nameRu: 'Уран',
    radius: 25362,
    distanceFromSun: 2871,
    orbitalPeriod: 30687,
    color: '#7ec8e3',
    orbitRadius: 320,
    displaySize: 9,
    description: 'Ледяной гигант, вращающийся «на боку». Имеет тонкие кольца и 27 спутников.'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    nameRu: 'Нептун',
    radius: 24622,
    distanceFromSun: 4495,
    orbitalPeriod: 60190,
    color: '#4169e1',
    orbitRadius: 370,
    displaySize: 8,
    description: 'Самая далёкая планета. Имеет самые сильные ветры в Солнечной системе (до 2100 км/ч).'
  }
];

export const sunData = {
  name: 'Солнце',
  radius: 696340,
  color: '#ffdd00',
  description: 'Звезда в центре нашей Солнечной системы. Содержит 99.86% массы всей системы.'
};
