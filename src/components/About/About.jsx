import Section from "../Section/Section";
import shared from "../../styles/shared.module.css";
import styles from "./About.module.css";

export default function About({ t }) {
  return (
    <Section id="about" title={t.about}>
      <div className={`${shared.card} ${styles.about}`}>
        <div className={styles.avatar} aria-hidden="true">NA</div>
        <div>
          {t.bio.map((text, i) => (
            <p key={i} className={styles.p}>{text}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
