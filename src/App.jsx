import { useEffect, useState } from "react";
import useScrollProgress from "./hooks/useScrollProgress";
import { T, LANG_TAGS } from "./data/content";
import Scene from "./components/Scene/Scene";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Work from "./components/Work/Work";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

export default function App() {
  const progress = useScrollProgress();
  const [lang, setLang] = useState("pt");
  const t = T[lang];

  useEffect(() => {
    document.documentElement.lang = LANG_TAGS[lang];
  }, [lang]);

  return (
    <>
      <Scene progress={progress} />
      <Navbar labels={t.nav} lang={lang} onLangChange={setLang} />
      <main style={{ position: "relative", zIndex: 1, paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <Hero t={t} />
        <Work t={t} />
        <About t={t} />
        <Skills t={t} />
        <Contact t={t} />
        <Footer text={t.foot} />
      </main>
    </>
  );
}
