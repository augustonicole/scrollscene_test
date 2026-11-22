import shared from "../../styles/shared.module.css";
import styles from "./Hero.module.css";

export default function Hero({ t }) {
  return (
    <section id="home" className={styles.hero}>
      <div className={shared.wrap}>
        <small className={styles.role}>{t.role}</small>
        <h1>{t.title}</h1>
        <p>{t.lead}</p>
        <a className={shared.btn} href="#work">{t.cta1}</a>
        <a className={`${shared.btn} ${shared.ghost}`} href="#contact">{t.cta2}</a>
      </div>
    </section>
  );
}
