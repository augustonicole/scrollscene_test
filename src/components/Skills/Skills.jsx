import Section from "../Section/Section";
import shared from "../../styles/shared.module.css";
import { SKILLS } from "../../data/content";
import styles from "./Skills.module.css";

export default function Skills({ t }) {
  return (
    <Section id="skills" title={t.skills}>
      <div className={shared.grid}>
        {SKILLS.map(({ group, items }) => (
          <div key={group} className={shared.card}>
            <h3>{group}</h3>
            <div className={styles.chips}>
              {items.map((s) => <span key={s}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
