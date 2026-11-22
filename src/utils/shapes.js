// interpola entre keyframes [{p, x, y, ...}] para o progresso p
export function lerpKeys(keys, p) {
  if (p <= keys[0].p) return keys[0];
  const last = keys[keys.length - 1];
  if (p >= last.p) return last;
  let i = 0;
  while (p > keys[i + 1].p) i++;
  const a = keys[i], b = keys[i + 1], t = (p - a.p) / (b.p - a.p);
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}
