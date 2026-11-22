import { useState } from "react";
import { SECTION_IDS } from "../../data/content";
import styles from "./Navbar.module.css";

const LANGS = ["pt", "en", "es"];

export default function Navbar({ labels, lang, onLangChange }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a className={styles.logo} href="#home">
          Logo<i>.</i>Nome
        </a>

        <button className={styles.burger} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>

        <div className={`${styles.links} ${open ? styles.open : ""}`}>
          {SECTION_IDS.map((id, i) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {labels[i]}
            </a>
          ))}
          <div className={styles.lang}>
            {LANGS.map((l) => (
              <button key={l} className={l === lang ? styles.on : ""} onClick={() => onLangChange(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
