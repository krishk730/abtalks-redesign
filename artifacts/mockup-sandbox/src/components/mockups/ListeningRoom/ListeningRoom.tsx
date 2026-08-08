import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Menu,
  Play,
  Plus,
  Search,
  X,
} from "lucide-react";

type Talk = {
  id: string;
  number: string;
  theme: string;
  title: string;
  person: string;
  detail: string;
  duration: string;
  color: string;
  quote: string;
};

const talks: Talk[] = [
  {
    id: "attention",
    number: "01",
    theme: "THE INNER LIFE",
    title: "The radical act of paying attention",
    person: "Jenny Odell",
    detail: "Artist, author, professional noticer",
    duration: "38 min",
    color: "blue",
    quote: "Attention is the beginning of devotion.",
  },
  {
    id: "ordinary",
    number: "02",
    theme: "SMALL WORLDS",
    title: "What the ordinary can teach us",
    person: "Ross Gay",
    detail: "Poet, gardener, joyful witness",
    duration: "24 min",
    color: "orange",
    quote: "Joy is not a distraction from the world. It is a way back into it.",
  },
  {
    id: "future",
    number: "03",
    theme: "THE LONG VIEW",
    title: "A future we can actually live in",
    person: "Aja Barber",
    detail: "Writer and systems thinker",
    duration: "41 min",
    color: "green",
    quote: "A livable future starts with the lives we choose to value now.",
  },
  {
    id: "belonging",
    number: "04",
    theme: "BELONGING",
    title: "Making room for a larger we",
    person: "Mia Birdsong",
    detail: "Writer, organizer, civic dreamer",
    duration: "31 min",
    color: "violet",
    quote: "Belonging is something we build together, in public.",
  },
];

const themes = ["All talks", "Attention", "Belonging", "The natural world", "Work, but better"];

export function ListeningRoom() {
  const [activeId, setActiveId] = useState("attention");
  const [playing, setPlaying] = useState<Talk | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("All talks");
  const [menuOpen, setMenuOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const active = talks.find((talk) => talk.id === activeId) ?? talks[0];
  const filteredTalks = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return talks.filter((talk) => {
      const inTheme =
        theme === "All talks" ||
        talk.theme.toLowerCase().includes(theme.toLowerCase()) ||
        talk.title.toLowerCase().includes(theme.toLowerCase());
      const inQuery =
        !normalized ||
        `${talk.title} ${talk.person} ${talk.detail}`.toLowerCase().includes(normalized);
      return inTheme && inQuery;
    });
  }, [query, theme]);

  const moveActive = (direction: number) => {
    const currentIndex = talks.findIndex((talk) => talk.id === active.id);
    const next = talks[(currentIndex + direction + talks.length) % talks.length];
    setActiveId(next.id);
  };

  const toggleSaved = (id: string) => {
    setSaved((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));
  };

  return (
    <main className="listen-shell">
      <header className="listen-header">
        <a href="#top" className="listen-logo" aria-label="ABTalks home">
          <span className="listen-logo-dot" />
          <span>AB<br /><em>TALKS</em></span>
        </a>
        <div className="listen-header-note">A listening room for better questions</div>
        <nav className={`listen-nav ${menuOpen ? "listen-nav-open" : ""}`}>
          <a href="#library" onClick={() => setMenuOpen(false)}>Library</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <button type="button" onClick={() => setSubscribed(true)} className="listen-nav-cta">Join the dispatch <ArrowUpRight size={14} /></button>
        </nav>
        <button type="button" className="listen-menu" aria-label="Toggle navigation" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      <section id="top" className="listen-hero">
        <div className="listen-hero-copy">
          <p className="listen-kicker">AB / LISTENING ROOM <span>2025</span></p>
          <h1>Take a<br /><i>closer</i> listen.</h1>
          <p className="listen-hero-description">Ideas for the in-between moments. Pick a thread, stay awhile, and leave with a question you can carry.</p>
          <div className="listen-hero-actions">
            <button type="button" className="listen-primary" onClick={() => { setActiveId("attention"); setPlaying(talks[0]); }}>
              <span className="listen-play-mark"><Play size={15} fill="currentColor" /></span>
              Start with a good question
            </button>
            <a href="#library" className="listen-text-link">Browse the room <ArrowDown size={15} /></a>
          </div>
        </div>
        <div className="listen-art-wrap">
          <div className="listen-art-frame">
            <img src="/__mockup/images/listening-desk-editorial.png" alt="A cobalt notebook and audio recorder on a warm editorial desk" />
            <div className="listen-art-caption"><span>FIELD NOTE 07</span><span>LISTEN SLOWLY</span></div>
          </div>
          <div className="listen-sticker">Come for<br /><i>the question.</i><ArrowDown size={17} /></div>
          <div className="listen-art-index">01 / 04</div>
        </div>
      </section>

      <section id="library" className="listen-library">
        <div className="listen-library-head">
          <div>
            <p className="listen-kicker orange">THE LIBRARY</p>
            <h2>Choose a<br /><i>thread.</i></h2>
          </div>
          <p className="listen-library-intro">Not a feed. A small collection of conversations, arranged by the feeling you came looking for.</p>
        </div>
        <div className="listen-controls">
          <div className="listen-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search people or ideas" aria-label="Search people or ideas" /></div>
          <div className="listen-filter-row">
            {themes.map((item) => <button type="button" key={item} className={theme === item ? "filter-active" : ""} onClick={() => setTheme(item)}>{item}</button>)}
          </div>
        </div>
        <div className="listen-room">
          <aside className="listen-index">
            <p className="listen-kicker">THE ROOM / {String(filteredTalks.length).padStart(2, "0")}</p>
            <div className="listen-index-list">
              {filteredTalks.map((talk) => <button type="button" key={talk.id} className={active.id === talk.id ? "index-active" : ""} onClick={() => setActiveId(talk.id)}>
                <span>{talk.number}</span><strong>{talk.theme}</strong><small>{talk.person}</small>
              </button>)}
              {filteredTalks.length === 0 && <p className="listen-empty">No thread found.<br />Try a different word.</p>}
            </div>
            <div className="listen-room-tip"><Plus size={15} /><span>New conversations<br />arrive every other week.</span></div>
          </aside>
          <article className={`listen-feature listen-tone-${active.color}`}>
            <div className="feature-orbit orbit-one" /><div className="feature-orbit orbit-two" />
            <div className="listen-feature-top"><span className="listen-kicker">{active.theme}</span><span className="feature-count">{active.number} / 04</span></div>
            <div className="listen-feature-content">
              <p className="feature-label">A CONVERSATION WITH</p>
              <h3>{active.person}</h3>
              <p className="feature-title">{active.title}</p>
              <p className="feature-detail">{active.detail}</p>
            </div>
            <div className="listen-feature-bottom">
              <button type="button" className="feature-play" onClick={() => setPlaying(active)}><Play size={17} fill="currentColor" /> Listen now</button>
              <button type="button" className="feature-save" onClick={() => toggleSaved(active.id)}><Bookmark size={16} fill={saved.includes(active.id) ? "currentColor" : "none"} /> {saved.includes(active.id) ? "Saved" : "Save for later"}</button>
              <span className="feature-duration"><Headphones size={14} /> {active.duration}</span>
            </div>
          </article>
          <aside className="listen-quote">
            <div className="quote-top"><span>FROM THE TALK</span><span>✳</span></div>
            <blockquote>“{active.quote}”</blockquote>
            <div className="quote-nav"><button type="button" aria-label="Previous talk" onClick={() => moveActive(-1)}><ChevronLeft size={17} /></button><button type="button" aria-label="Next talk" onClick={() => moveActive(1)}><ChevronRight size={17} /></button></div>
          </aside>
        </div>
      </section>

      <section id="about" className="listen-about">
        <div className="listen-about-mark">AB<span>×</span></div>
        <div className="listen-about-copy"><p className="listen-kicker">WHY WE'RE HERE</p><h2>Good ideas<br />need <i>room.</i></h2><p>ABTalks is a place for the side note, the story behind the story, and the question nobody thought to ask out loud.</p></div>
        <div className="listen-dispatch"><p className="listen-kicker">A NOTE FOR YOUR INBOX</p><p>One thoughtful dispatch, twice a month.</p>{subscribed ? <div className="listen-subscribed"><Check size={15} /> You&apos;re on the list.</div> : <form onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }}><input required type="email" placeholder="Your email address" aria-label="Your email address" /><button type="submit">I&apos;m in <ArrowUpRight size={15} /></button></form>}</div>
      </section>

      <footer className="listen-footer"><span>AB / TALKS</span><span>LISTEN SLOWLY · THINK WIDELY · STAY CURIOUS</span><span>© 2025</span></footer>

      {playing && <div className="listen-player"><button type="button" className="player-icon" onClick={() => setPlaying(null)}><X size={16} /></button><div className="player-copy"><span>NOW PLAYING</span><strong>{playing.title}</strong></div><div className="player-progress"><div /><small>{playing.duration}</small></div><button type="button" className="player-pause" onClick={() => setPlaying(null)}><span /><span /></button></div>}
    </main>
  );
}
