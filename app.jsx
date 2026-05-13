/* Main app - bilingual artist site */

const { useState, useEffect, useMemo, useRef } = React;
const D = window.SITE_DATA;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "en",
  "hero": "fullbleed",
  "palette": "warm",
  "density": "loose",
  "showCaptions": true
} /*EDITMODE-END*/;

// ── i18n strings ────────────────────────────────────────────────
const STR = {
  de: {
    nav: { works: "Arbeiten", about: "Statement", exhibitions: "Ausstellungen", cv: "CV", contact: "Kontakt" },
    heroTitle1: "Jana", heroTitle2: "Nowack",
    heroSub: "Malerei · Keramik · Fotografie · Künstlerbücher",
    heroMeta: ["Berlin", "MFA HGB Leipzig", "Seit 2009"],
    heroFeatured: "Aktuell · House of the Sun, 2025",
    heroQuote: "Wo gehöre ich hin? Was bedeutet es, frei zu sein? Was lässt sich verwandeln?",
    heroIndex: "Index der Arbeiten",

    aboutNum: "01 - Statement",
    aboutTitle: "Emotionale Landschaften, eher als Orte.",
    aboutP1: "Jana Nowack arbeitet in den Bereichen Malerei, Keramik, Siebdruck und Fotografie und erstellt Künstlerbücher. Ihre Arbeit bewegt sich zwischen dem Expressiven und dem Investigativen, zwischen Geste und Kontemplation, zwischen dem Mythologischen und dem zutiefst Persönlichen. Wiederkehrende Motive - Pferde, Häuser, Sonnen, Sternbilder - ziehen sich wie ein roter Faden durch all ihre Werke.",
    aboutP2: 'Ihre Gemälde sind eher emotionale Landschaften als Orte. In Werken wie „House of the Sun“ und „Wings of the Sun“ sind weite Felder warmer Farben - Terrakotta, Gold, Koralle, Blaugrün - mit einer ruhigen Zuversicht angeordnet, als sei die Welt selbst nach einer inneren Logik neu geordnet worden.',
    aboutP3: "Sie wuchs mit Pferden auf. Als junge Frau reiste sie nach Island, um sie zu trainieren, und lernte dabei ihre Sprache, ihr Gewicht und ihre besondere Art von Wildheit kennen. Diese Erfahrung setzte sich tief in ihr fest und fand schließlich ihren Weg zurück durch Farbe und Ton.",
    aboutP4: "Für Jana ist Kunst keine Flucht, sondern eine Rekonstruktion des Selbst. Farbe wurde zu ihrer Sprache, Licht zu ihrem Raum, und die Leinwand wurde zum Ort, an dem sie entscheiden kann, wer sie ist.",
    aboutSigned: "Rubee June",

    worksNum: "02 - Arbeiten",
    worksTitle: "Werke",
    cat: { paintings: "Ausgewählte Malerei", ceramics: "Ausgewählte Keramik", prints: "Ausgewählter Siebdruck & Linoldruck", photography: "Ausgewählte Fotografie", publications: "Ausgewählte Publikationen", exhibitionViews: "Ausstellungen", knSpace: "KN – Space for Art in Context" },
    catCount: (n) => `${String(n).padStart(2, "0")} Arbeiten`,

    exNum: "03 - Ausgewählte Ausstellungen",
    exTitle: "Ausstellungen",
    exSub: "Auswahl 2009–2025 · Europa, USA, Südamerika",

    cvNum: "04 - Curriculum Vitae",
    cvTitle: "CV",
    cvSummary: "Bildende Künstlerin (MFA, HGB Leipzig, Klasse für Kunstfotografie bei Prof. Tina Bara) mit internationaler Ausstellungspraxis in Europa, den USA und Südamerika. Werke in Privatsammlungen in New York, Melbourne und Leipzig. Multimediale Praxis in Malerei, Fotografie, Siebdruck und Ton. Zwei Shortlist-Nominierungen für den Dummy Award (2013, 2021).",
    cvEd: "Ausbildung", cvExp: "Projekte", cvSkills: "Ausstellungen", cvPub: "Publikationen & Künstlerbücher", cvCur: "Kuratorische Tätigkeit (Auswahl)",
    skills: [
    ["E-Mail", "ja.now.space@gmail.com"],
    ["Telefon", "+49 (0)30 217 58 236"],
    ["Instagram", "@nowackjana"],
    ["Studio", "Berlin, Deutschland"]],


    contactNum: "05 - Studio & Kontakt",
    contactTitle: "Kontakt",
    contactLabels: { email: "E-Mail", phone: "Telefon", social: "Instagram" },
    rights: "© 2026 Jana Nowack · Alle Rechte vorbehalten",
    impressumNote: "Berlin, Deutschland"
  },
  en: {
    nav: { works: "Works", about: "Statement", exhibitions: "Exhibitions", cv: "CV", contact: "Contact" },
    heroTitle1: "Jana", heroTitle2: "Nowack",
    heroSub: "Painting · Ceramics · Photography · Artist books",
    heroMeta: ["Berlin", "MFA HGB Leipzig", "Since 2009"],
    heroFeatured: "Current · House of the Sun, 2025",
    heroQuote: "Where do I belong? What does it mean to be free? What can be transformed?",
    heroIndex: "Index of works",

    aboutNum: "01 - Statement",
    aboutTitle: "Emotional landscapes, rather than places.",
    aboutP1: "Jana Nowack works across painting, ceramics, screenprint, and photography, and makes artist books. Her practice moves between the expressive and the investigative, between gesture and contemplation, between the mythological and the deeply personal. Recurring motifs - horses, houses, suns, constellations - run like a red thread through all of her work.",
    aboutP2: 'Her paintings are emotional landscapes more than places. In works like “House of the Sun” and “Wings of the Sun,” broad fields of warm colour - terracotta, gold, coral, blue-green - are arranged with a quiet confidence, as if the world itself had been re-ordered according to an inner logic.',
    aboutP3: "She grew up with horses. As a young woman she travelled to Iceland to train them, learning their language, their weight, and their particular kind of wildness. That experience settled deep inside her and eventually found its way back out through colour and clay.",
    aboutP4: "For Jana, art is not an escape but a reconstruction of the self. Colour became her language, light her space, and the canvas the place where she can decide who she is.",
    aboutSigned: "Rubee June",

    worksNum: "02 - Works",
    worksTitle: "Works",
    cat: { paintings: "Selected Paintings", ceramics: "Selected Ceramics", prints: "Selected Screenprint & Linocut", photography: "Selected Photography", publications: "Selected Publications", exhibitionViews: "Exhibitions", knSpace: "KN – Space for Art in Context" },
    catCount: (n) => `${String(n).padStart(2, "0")} works`,

    exNum: "03 - Selected exhibitions",
    exTitle: "Exhibitions",
    exSub: "Selection 2009–2025 · Europe, USA, South America",

    cvNum: "04 - Curriculum Vitae",
    cvTitle: "CV",
    cvSummary: "Visual artist (MFA, HGB Leipzig, Class of Art Photography with Prof. Tina Bara) with an international exhibition practice across Europe, the USA, and South America. Works in private collections in New York, Melbourne, and Leipzig. Multimedia practice in painting, photography, screenprint, and clay. Two shortlist nominations for the Dummy Award (2013, 2021).",
    cvEd: "Education", cvExp: "Projects", cvSkills: "Exhibitions", cvPub: "Publications & Artist Books", cvCur: "Curatorial Practice (Selection)",
    skills: [
    ["Email", "ja.now.space@gmail.com"],
    ["Phone", "+49 (0)30 217 58 236"],
    ["Instagram", "@nowackjana"],
    ["Studio", "Berlin, Germany"]],


    contactNum: "05 - Studio & contact",
    contactTitle: "Contact",
    contactLabels: { email: "Email", phone: "Phone", social: "Instagram" },
    rights: "© 2026 Jana Nowack · All rights reserved",
    impressumNote: "Berlin, Germany"
  }
};

// ── Components ──────────────────────────────────────────────────
function Nav({ lang, onLang }) {
  const t = STR[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);
  const close = () => setMenuOpen(false);
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-name" onClick={close}>Jana Nowack</a>
        <div className="nav-links">
          <a href="#works">{t.nav.works}</a>
          <a href="#cv">{t.nav.cv}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>
        <div className="lang-toggle" role="group" aria-label="language">
          <button className={lang === "en" ? "active" : ""} onClick={() => onLang("en")}>EN</button>
          <span style={{ opacity: 0.4 }}>/</span>
          <button className={lang === "de" ? "active" : ""} onClick={() => onLang("de")}>DE</button>
        </div>
        <button
          className={"nav-burger" + (menuOpen ? " open" : "")}
          aria-label="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}>
          <span></span><span></span><span></span>
        </button>
      </div>
      <div className={"nav-sheet" + (menuOpen ? " open" : "")} onClick={close}>
        <div className="nav-sheet-inner" onClick={e => e.stopPropagation()}>
          <a href="#top" onClick={close}>Home</a>
          <a href="#works" onClick={close}>{t.nav.works}</a>
          <a href="#cv" onClick={close}>{t.nav.cv}</a>
          <a href="#contact" onClick={close}>{t.nav.contact}</a>
          <div className="nav-sheet-lang">
            <button className={lang === "en" ? "active" : ""} onClick={() => { onLang("en"); close(); }}>EN</button>
            <span style={{ opacity: 0.4 }}>/</span>
            <button className={lang === "de" ? "active" : ""} onClick={() => { onLang("de"); close(); }}>DE</button>
          </div>
        </div>
      </div>
    </nav>);

}

function Hero({ lang, variant, onOpen }) {
  const t = STR[lang];
  const featured = D.paintings[0]; // House of the Sun
  const fbFeatured = D.paintings.find((p) => p.title === "Astronaut") || featured;
  if (variant === "fullbleed") {
    return (
      <section id="top" className="hero" data-variant="fullbleed">
        <div
          className="fb-bg"
          onClick={() => onOpen("paintings", D.paintings.indexOf(fbFeatured))}
          style={{ cursor: "zoom-in" }}
          aria-label={fbFeatured.title}>
          
          <img src={fbFeatured.img} alt={fbFeatured.title} />
          <div className="fb-shade" aria-hidden="true"></div>
        </div>
        <div className="fb-content">
          <div className="wrap fb-wrap">
            <div className="fb-top">
              <div className="fb-mark">Jana Nowack</div>
            </div>
            <div className="fb-mid">
              <h1 className="fb-title" style={{ opacity: "61" }}>Emotional landscapes, rather than places.</h1>
            </div>
            <div className="fb-bot" style={{ width: "500px" }}>
              <p className="fb-intro">Jana Nowack works across painting, ceramics, screenprint, and photography, and makes artist books. Her practice moves between the expressive and the investigative, between gesture and contemplation, between the mythological and the deeply personal. Recurring motifs - horses, houses, suns, constellations - run like a red thread through all of her work.</p>
            </div>
          </div>
          <a href="#about" className="scroll-cue" aria-label="scroll down">
            <span className="scroll-cue-line"></span>
            <span className="scroll-cue-arrow">↓</span>
          </a>
        </div>
      </section>);

  }
  if (variant === "bigtype") {
    return (
      <section id="top" className="hero" data-variant="bigtype">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-text">
              <h1 className="display">{t.aboutTitle}</h1>
              <p className="lede" style={{ marginTop: 28, maxWidth: "60ch" }}>{t.aboutP1}</p>
            </div>
            <div className="hero-art reveal in" onClick={() => onOpen("paintings", 0)} style={{ cursor: "zoom-in" }}>
              <img src={featured.img} alt={featured.title} />
            </div>
          </div>
        </div>
      </section>);

  }
  if (variant === "mosaic") {
    return (
      <section id="top" className="hero" data-variant="mosaic">
        <div className="wrap">
          <div className="hero-grid">
            <div className="m-name">
              <h1 className="display" style={{ fontSize: "clamp(28px,4vw,52px)" }}>{t.aboutTitle}</h1>
            </div>
            <div className="m m1" onClick={() => onOpen("paintings", 0)}><img src={D.paintings[0].img} alt="" /></div>
            <div className="m m2" onClick={() => onOpen("paintings", 3)}><img src={D.paintings[3].img} alt="" /></div>
            <div className="m m3" onClick={() => onOpen("ceramics", 0)}><img src={D.ceramics[0].img} alt="" /></div>
            <div className="m m4" onClick={() => onOpen("photography", 0)}><img src={D.photography[0].img} alt="" /></div>
            <div className="m-cap">
              <div>
                <div className="lede" style={{ maxWidth: "42ch" }}>{t.aboutP1}</div>
              </div>
            </div>
          </div>
        </div>
      </section>);

  }
  // split (default)
  return (
    <section id="top" className="hero" data-variant="split">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-text">
            <h1 className="display">{t.aboutTitle}</h1>
            <p className="lede" style={{ marginTop: 28, maxWidth: "42ch" }}>{t.aboutP1}</p>
          </div>
          <div className="hero-art" onClick={() => onOpen("paintings", 0)} style={{ cursor: "zoom-in" }}>
            <img src={featured.img} alt={featured.title} />
          </div>
        </div>
        <a href="#about" className="scroll-cue scroll-cue-dark" aria-label="scroll down">
          <span className="scroll-cue-line"></span>
          <span className="scroll-cue-arrow">↓</span>
        </a>
      </div>
    </section>);

}

function Statement({ lang }) {
  const t = STR[lang];
  return (
    <section id="about" className="section about">
      <div className="wrap">
        <div className="columns">
          <div>
            <p>{t.aboutP2}</p>
            <p>{t.aboutP3}</p>
          </div>
          <div>
            <p>{t.aboutP4}</p>
            <div className="signed">{t.aboutSigned}</div>
          </div>
        </div>
      </div>
    </section>);

}

function WorkCard({ work, lang, onOpen, idx }) {
  const t = STR[lang];
  return (
    <div className="work" onClick={() => onOpen(idx)}>
      <div className="frame"><img src={work.img} alt={work.title} loading="lazy" /></div>
      <div className="cap">
        <span className="t">{work.title}</span>
        <span className="y">{work.year}</span>
        <span className="m">{lang === "de" ? work.medium_de : work.medium_en} · {work.size}{work[`note_${lang}`] ? <> · {work[`note_${lang}`]}</> : null}</span>
      </div>
    </div>);

}

function PubCard({ pub, lang }) {
  const view = lang === "de" ? pub.view_de : pub.view_en;
  return (
    <div className="work pub-card">
      <div className="frame pub-frame"><img src={pub.img} alt={pub.title} loading="lazy" /></div>
      <div className="cap">
        <span className="t">{pub.title}{view ? <em className="view"> · {view}</em> : null}</span>
        <span className="y">{pub.year}</span>
        <span className="m">{lang === "de" ? pub.de : pub.en}</span>
      </div>
    </div>);

}

function Works({ lang, onOpen }) {
  const t = STR[lang];
  const cats = [
  { key: "paintings", items: D.paintings },
  { key: "ceramics", items: D.ceramics },
  { key: "prints", items: D.prints },
  { key: "photography", items: D.photography },
  { key: "exhibitionViews", items: D.exhibitionViews },
  { key: "knSpace", items: D.knSpace },
  { key: "publications", items: D.publications }];

  return (
    <section id="works" className="section works">
      <div className="wrap">
        <div className="section-head">
          <h2 className="display">{t.worksTitle}</h2>
        </div>
        {cats.map((c) =>
        <div key={c.key} className={`works-cat ${c.key}`}>
            <div className="cat-head">
              <h3 className="display">{t.cat[c.key]}</h3>
            </div>
            <div className="grid">
              {c.key === "publications" ?
            c.items.map((w, i) => <PubCard key={i} pub={w} lang={lang} />) :
            c.items.map((w, i) => <WorkCard key={i} work={w} lang={lang} idx={i} onOpen={(idx) => onOpen(c.key, idx)} />)}
            </div>
          </div>
        )}
      </div>
    </section>);

}

function Exhibitions({ lang }) {
  const t = STR[lang];
  return (
    <section id="exhibitions" className="section">
      <div className="wrap">
        <div className="section-head">
          <h2 className="display">{t.exTitle}</h2>
        </div>
        <p className="lede" style={{ marginBottom: 40, color: "var(--ink-soft)" }}>{t.exSub}</p>
        <div className="cv-list">
          {D.exhibitions.map((row, i) =>
          <div key={i} className="cv-row">
              <span className="y">{row.year}</span>
              <span className="v">{lang === "de" ? row.de : row.en}</span>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function CV({ lang }) {
  const t = STR[lang];
  return (
    <section id="cv" className="section cv-section">
      <div className="wrap">
        <div className="section-head">
          <h2 className="display">{t.cvTitle}</h2>
        </div>
        <p className="cv-summary">{t.cvSummary}</p>

        <div className="cv-block">
          <h3>{t.cvEd}</h3>
          <div className="cv-list">
            {D.education.map((row, i) =>
            <div key={i} className="cv-row">
                <span className="y">{row.year}</span>
                <span className="v">{lang === "de" ? row.de : row.en}</span>
              </div>
            )}
          </div>
        </div>

        <div className="cv-block">
          <h3>{t.cvSkills}</h3>
          <div className="cv-list">
            {D.exhibitions.map((row, i, arr) =>
            <div key={i} className="cv-row">
                <span className="y">{i === 0 || arr[i - 1].year !== row.year ? row.year : ""}</span>
                <span className="v">{lang === "de" ? row.de : row.en}</span>
              </div>
            )}
          </div>
        </div>

        <div className="cv-block">
          <h3>{t.cvCur}</h3>
          <div className="cv-list">
            {D.curating.map((row, i) =>
            <div key={i} className="cv-row">
                <span className="y">{row.year}</span>
                <span className="v">{lang === "de" ? row.de : row.en}</span>
              </div>
            )}
          </div>
        </div>

        <div className="cv-block">
          <h3>{t.cvPub}</h3>
          <div className="cv-list">
            {D.cvPublications.map((row, i) =>
            <div key={i} className="cv-row">
                <span className="y">{row.year}</span>
                <span className="v">{lang === "de" ? row.de : row.en}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

function Contact({ lang }) {
  const t = STR[lang];
  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <h2 className="display">{t.contactTitle.split(" ").map((w, i, arr) => <span key={i}>{w}{i < arr.length - 1 ? " " : ""}</span>)}</h2>
        <div className="contact-grid">
          <div className="contact-block">
            <div className="label">{t.contactLabels.email}</div>
            <div className="v"><a href="mailto:ja.now.space@gmail.com">ja.now.space@gmail.com</a></div>
          </div>
          <div className="contact-block">
            <div className="label">{t.contactLabels.phone}</div>
            <div className="v"><a href="tel:+4930217582 36">+49 (0)30 217 58 236</a></div>
          </div>
          <div className="contact-block">
            <div className="label">{t.contactLabels.social}</div>
            <div className="v"><a href="https://www.instagram.com/nowackjana/" target="_blank" rel="noreferrer">@nowackjana</a></div>
          </div>
        </div>
        <div className="contact-foot">
          <span>{t.rights}</span>
          <span>{t.impressumNote}</span>
          <span>Site · 2026</span>
        </div>
      </div>
    </section>);

}

function Lightbox({ open, items, idx, onClose, onPrev, onNext, lang }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {window.removeEventListener("keydown", onKey);document.body.style.overflow = "";};
  }, [open, onClose, onPrev, onNext]);
  if (!open || !items) return null;
  const w = items[idx];
  return (
    <div className={`lightbox ${open ? "open" : ""}`} onClick={onClose}>
      <button className="lb-x" onClick={onClose}>{lang === "de" ? "Schließen ✕" : "Close ✕"}</button>
      <button className="lb-arrow lb-prev" onClick={(e) => {e.stopPropagation();onPrev();}}>‹</button>
      <button className="lb-arrow lb-next" onClick={(e) => {e.stopPropagation();onNext();}}>›</button>
      <img src={w.img} alt={w.title} onClick={(e) => e.stopPropagation()} />
      <div className="lb-cap">
        <span className="t">{w.title}</span>
        {lang === "de" ? w.medium_de || w.de : w.medium_en || w.en} · {w.size || ""} · {w.year}
      </div>
    </div>);

}

// ── App ─────────────────────────────────────────────────────────
function App() {
  const t = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];
  const [tweaks, setTweak] = t;
  const [lang, setLang] = useState(tweaks.lang || "de");

  // Lightbox state
  const [lb, setLb] = useState({ open: false, cat: null, idx: 0 });
  const items = lb.cat ? D[lb.cat] : null;
  const openLb = (cat, idx) => setLb({ open: true, cat, idx });
  const closeLb = () => setLb((s) => ({ ...s, open: false }));
  const prevLb = () => setLb((s) => ({ ...s, idx: (s.idx - 1 + items.length) % items.length }));
  const nextLb = () => setLb((s) => ({ ...s, idx: (s.idx + 1) % items.length }));

  // Apply palette + density at root
  useEffect(() => {
    document.documentElement.dataset.palette = tweaks.palette || "warm";
    document.documentElement.dataset.density = tweaks.density || "loose";
  }, [tweaks.palette, tweaks.density]);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll(".section, .work, .hero-art");
    els.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {e.target.classList.add("in");io.unobserve(e.target);}
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  // Body.scrolled class - for fullbleed hero nav transition
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) document.body.classList.add("scrolled");else
      document.body.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Nav lang={lang} onLang={(l) => {setLang(l);setTweak("lang", l);}} />
      <Hero lang={lang} variant={tweaks.hero || "split"} onOpen={openLb} />
      <Statement lang={lang} />
      <Works lang={lang} onOpen={openLb} />
      <CV lang={lang} />
      <Contact lang={lang} />
      <Lightbox open={lb.open} items={items} idx={lb.idx} lang={lang}
      onClose={closeLb} onPrev={prevLb} onNext={nextLb} />
      {window.TweaksPanel ?
      <window.TweaksPanel title="Tweaks">
          <window.TweakSection title={lang === "de" ? "Sprache" : "Language"}>
            <window.TweakRadio label="Lang" value={lang}
          onChange={(v) => {setLang(v);setTweak("lang", v);}}
          options={[{ value: "en", label: "EN" }, { value: "de", label: "DE" }]} />
          </window.TweakSection>
          <window.TweakSection title={lang === "de" ? "Startseite" : "Homepage"}>
            <window.TweakSelect label={lang === "de" ? "Hero-Variante" : "Hero variant"} value={tweaks.hero}
          onChange={(v) => setTweak("hero", v)}
          options={[
          { value: "fullbleed", label: lang === "de" ? "Vollbild" : "Full bleed" },
          { value: "split", label: "Split" },
          { value: "bigtype", label: lang === "de" ? "Großes Typo" : "Big type" },
          { value: "mosaic", label: "Mosaic" }]
          } />
          </window.TweakSection>
          <window.TweakSection title={lang === "de" ? "Farbe & Typo" : "Colour & type"}>
            <window.TweakSelect label="Palette" value={tweaks.palette}
          onChange={(v) => setTweak("palette", v)}
          options={[
          { value: "warm", label: lang === "de" ? "Warm Earth" : "Warm earth" },
          { value: "cool", label: lang === "de" ? "Kühl Blau" : "Cool blue" },
          { value: "cream", label: "Cream" },
          { value: "dark", label: lang === "de" ? "Dunkel" : "Dark" }]
          } />
            <window.TweakRadio label={lang === "de" ? "Dichte" : "Density"} value={tweaks.density}
          onChange={(v) => setTweak("density", v)}
          options={[
          { value: "loose", label: lang === "de" ? "Locker" : "Loose" },
          { value: "dense", label: lang === "de" ? "Dicht" : "Dense" }]
          } />
          </window.TweakSection>
        </window.TweaksPanel> :
      null}
    </>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);