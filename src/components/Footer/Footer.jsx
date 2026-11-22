import styles from "./Footer.module.css";

export default function Footer({ text }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.trees} aria-hidden="true">🌲🌲🌲</div>
      <div>© {new Date().getFullYear()} Nicole Augusto · {text}</div>
    </footer>
  );
}
