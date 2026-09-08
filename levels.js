// levels.js - Configuración de 20 niveles con retos progresivos

export const LEVELS = [
  // Nivel 1 (Tutorial - Fácil)
  {
    nivel: 1,
    tiempo: 40,
    recursos: 6,
    tipos: ['🌱', '💧'],
    reto: 'Recolecta 3 recursos',
    anuncio: false
  },
  // Nivel 2 (Primer reto real)
  {
    nivel: 2,
    tiempo: 30,
    recursos: 10,
    tipos: ['🌱', '💧', '🌿'],
    reto: 'Recolecta 5 recursos en 30s',
    anuncio: 'intersticial' // ← Anuncio al pasar
  },
  // Nivel 3 (Complejo)
  {
    nivel: 3,
    tiempo: 25,
    recursos: 14,
    tipos: ['🌱', '💧', '🌿', '🍄'],
    reto: 'Recolecta 7 recursos sin fallar',
    anuncio: 'intersticial'
  },
  // Niveles 4-20 (Escalada)
  ...Array.from({ length: 17 }, (_, i) => {
    const n = i + 4;
    return {
      nivel: n,
      tiempo: Math.max(15, 30 - n * 0.8),
      recursos: Math.min(30, 10 + n * 1.5),
      tipos: ['🌱', '💧', '🌿', '🍄', '🌸', '🌳'].slice(0, Math.min(4 + Math.floor(n / 5), 6)),
      reto: `Recolecta ${Math.min(15, 5 + n)} recursos`,
      anuncio: n % 2 === 0 ? 'intersticial' : 'recompensado'
    };
  })
];