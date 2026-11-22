export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// gerador pseudoaleatório com semente (a mesma floresta a cada carregamento)
export const rng = (seed) => () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const hex = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));

export const mix = (a, b, t) => {
  const A = hex(a), B = hex(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`;
};

// interpola as cores do céu e o nível de escuridão para o progresso p (0 a 1)
export function sampleSky(stops, p) {
  let i = 0;
  while (i < stops.length - 2 && p > stops[i + 1].p) i++;
  const a = stops[i], b = stops[i + 1];
  const t = clamp((p - a.p) / (b.p - a.p));
  return { top: mix(a.top, b.top, t), bottom: mix(a.bottom, b.bottom, t), dark: a.dark + (b.dark - a.dark) * t };
}
