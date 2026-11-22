import shared from "../../styles/shared.module.css";

export default function Section({ id, title, children }) {
  return (
    <section id={id} className={shared.block}>
      <div className={shared.wrap}>
        <h2 className={shared.title}>{title}</h2>
        {children}
      </div>
    </section>
  );
}
