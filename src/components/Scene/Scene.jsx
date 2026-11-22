import scene from "../../data/scene.json";
import shapes from "../../data/shapes.json";
import { clamp, mix, rng, sampleSky } from "../../utils/color";
import { lerpKeys } from "../../utils/shapes";
import styles from "./Scene.module.css";

const STARS = Array.from({ length: scene.stars }, (_, i) => {
  const R = rng(i + 100);
  return { x: R() * 100, y: R() * 50, opacity: 0.4 + R() * 0.6 };
});

// proporção largura/altura de um viewBox "x y w h"
const ratio = (vb) => { const [, , w, h] = vb.split(" ").map(Number); return w / h; };

export default function Scene({ progress: p }) {
  const sky = sampleSky(scene.sky, p);
  const dark = sky.dark;
  const sun = lerpKeys(scene.sun, p);
  const moon = lerpKeys(scene.moon, p);
  const glow = clamp(Math.max(1 - p / 0.2, 1 - Math.abs(p - 0.72) / 0.2));

  // nuvem: branca de dia, levemente rosada no pôr do sol, azulada à noite
  const warm = [255, 255 - 38 * glow, 255 - 54 * glow], night = [42, 53, 102];
  const cloudFill = `rgb(${warm.map((v, i) => Math.round(v + (night[i] - v) * dark)).join(",")})`;

  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.fill} style={{ background: `linear-gradient(${sky.top},${sky.bottom})` }} />

      <div className={styles.fill} style={{ opacity: Math.pow(dark, 2.5) }}>
        {STARS.map((s, i) => (
          <span key={i} className={styles.star} style={{ left: `${s.x}%`, top: `${s.y}%`, opacity: s.opacity }} />
        ))}
      </div>

      <div
        className={styles.fill}
        style={{
          opacity: glow * 0.95,
          background: `radial-gradient(circle 60vmax at ${sun.x}% ${sun.y}%, rgba(240,100,110,.6) 0%, rgba(250,150,120,.28) 32%, transparent 62%)`
        }}
      />

      <div
        className={`${styles.orb} ${styles.sun}`}
        style={{ left: `${sun.x}%`, top: `${sun.y}%`, opacity: 1 - clamp((p - 0.86) / 0.08) }}
      />
      <div
        className={`${styles.orb} ${styles.moon}`}
        style={{ left: `${moon.x}%`, top: `${moon.y}%`, opacity: clamp((p - 0.75) / 0.15) }}
      />

      {scene.clouds.map((c, i) => {
        const s = shapes.clouds[c.shape];
        return (
          <svg
            key={`c${i}`}
            className={styles.cloud}
            viewBox={s.viewBox}
            style={{
              left: `${c.x + p * c.speed}%`,
              top: `${c.y}%`,
              width: `${c.w}vw`,
              opacity: 1 - dark * 0.55
            }}
          >
            <path d={s.d} fill={cloudFill} />
          </svg>
        );
      })}

      {scene.mountains.map((m, i) => {
        const s = shapes.mountains[m.shape];
        return (
          <svg
            key={`m${i}`}
            className={styles.mountain}
            viewBox={s.viewBox}
            preserveAspectRatio="none"
            style={{ bottom: `${m.bottom}%`, height: `${m.height}%`, transform: `translateY(${p * m.depth * 0.1}vh)` }}
          >
            <path d={s.d} transform={s.transform} fill={mix(m.day, m.night, dark)} />
          </svg>
        );
      })}

      {scene.pines.map((t, i) => {
        const s = shapes.pines[t.shape];
        const tone = scene.tones[t.tone];
        return (
          <svg
            key={`p${i}`}
            className={styles.pine}
            viewBox={s.viewBox}
            preserveAspectRatio="xMidYMax meet"
            style={{
              left: `${t.x}%`,
              bottom: `${t.bottom}%`,
              height: `${t.h}vh`,
              aspectRatio: ratio(s.viewBox),
              transform: `translateX(-50%)${t.flip ? " scaleX(-1)" : ""}`
            }}
          >
            <path d={s.d} fill={mix(tone.day, tone.night, dark)} />
          </svg>
        );
      })}

      <div className={styles.ground} style={{ background: mix(scene.tones.front.day, scene.tones.front.night, dark) }} />
    </div>
  );
}
