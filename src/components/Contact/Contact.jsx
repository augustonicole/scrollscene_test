import Section from "../Section/Section";
import shared from "../../styles/shared.module.css";
import { CONTACTS } from "../../data/content";
import styles from "./Contact.module.css";

export default function Contact({ t }) {
  return (
    <Section id="contact" title={t.contact}>
      <div className={shared.card}>
        <p className={styles.lead}>{t.contactLead}</p>
        {CONTACTS.map(({ label, value, href }) => (
          <a key={label} className={styles.item} href={href}>
            <b>{label}</b>
            <span>{value}</span>
          </a>
        ))}
      </div>
    </Section>
  );
}
