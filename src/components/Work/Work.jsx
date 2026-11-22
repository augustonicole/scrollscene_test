import Section from "../Section/Section";
import shared from "../../styles/shared.module.css";
import { GRADIENTS } from "../../data/content";
import styles from "./Work.module.css";

export default function Work({ t }) {
  return (
    <Section id="work" title={t.work}>
      <div className={shared.grid}>
        {t.projects.map((name, i) => (
          <article key={i} className={`${shared.card} ${styles.work}`}>
            <div className={styles.thumb} style={{ background: `linear-gradient(135deg,${GRADIENTS[i]})` }} />
            <div className={styles.body}>
              <small className={styles.tag}>{t.tags[i]}</small>
              <h3>{name}</h3>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
