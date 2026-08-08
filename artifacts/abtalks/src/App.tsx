import { type FormEvent, type ReactNode, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Check, ChevronRight, Headphones, Menu, Play, Plus, X } from 'lucide-react';
import { type ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Talk = {
  id: string;
  category: string;
  title: string;
  person: string;
  detail: string;
  duration: string;
  tone: string;
  number: string;
};

const talks: Talk[] = [
  {
    id: 'attention',
    category: 'THE INNER LIFE',
    title: 'The radical act of paying attention',
    person: 'Jenny Odell',
    detail: 'Artist, author, and professional noticer',
    duration: '38 min',
    tone: 'cobalt',
    number: '01',
  },
  {
    id: 'ordinary',
    category: 'SMALL WORLDS',
    title: 'What the ordinary can teach us',
    person: 'Ross Gay',
    detail: 'Poet, gardener, joyful witness',
    duration: '24 min',
    tone: 'coral',
    number: '02',
  },
  {
    id: 'future',
    category: 'THE LONG VIEW',
    title: 'A future we can actually live in',
    person: 'Aja Barber',
    detail: 'Writer and systems thinker',
    duration: '41 min',
    tone: 'teal',
    number: '03',
  },
];

const topics = ['Attention', 'Belonging', 'Work, but better', 'The natural world', 'Culture'];

function AnchorLink({ href, children, onClick, className = '' }: { href: string; children: ReactNode; onClick?: () => void; className?: string }) {
  return <a href={href} onClick={onClick} className={className}>{children}</a>;
}

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <AnchorLink href="#top" className={`group inline-flex items-start gap-2 ${inverse ? 'text-paper' : 'text-ink'}`} data-testid="link-logo">
      <span className="mt-1 h-2 w-2 rounded-full bg-coral transition-transform duration-300 group-hover:translate-y-1" />
      <span className="font-bold text-[1.15rem] leading-[0.9] tracking-[-0.08em]">AB<br /><span className="font-editorial font-normal tracking-[-0.08em]">TALKS</span></span>
    </AnchorLink>
  );
}

function ButtonArrow({ children, onClick, dark = false, testId }: { children: ReactNode; onClick?: () => void; dark?: boolean; testId: string }) {
  return (
    <button type="button" onClick={onClick} data-testid={testId} className={`group inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${dark ? 'bg-paper text-ink hover:bg-coral' : 'bg-ink text-paper hover:bg-cobalt'}`}>
      {children}
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-coral text-ink transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight size={15} strokeWidth={2.5} /></span>
    </button>
  );
}

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [['#latest', 'Latest'], ['#topics', 'Topics'], ['#about', 'About']];
  return (
    <header className="absolute left-0 right-0 top-0 z-30 px-5 pt-5 sm:px-8 sm:pt-7 lg:px-12">
      <nav className="mx-auto flex max-w-[1320px] items-start justify-between">
        <Logo inverse />
        <div className="hidden items-center gap-8 md:flex">
          {links.map(([href, label]) => <AnchorLink key={href} href={href} className="group text-[0.72rem] font-medium tracking-[0.08em] text-paper/70 transition-colors hover:text-paper" data-testid={`link-nav-${label.toLowerCase()}`}>{label}<span className="mt-1 block h-px w-0 bg-coral transition-all duration-300 group-hover:w-full" /></AnchorLink>)}
          <ButtonArrow dark testId="button-nav-explore" onClick={() => document.querySelector('#latest')?.scrollIntoView({ behavior: 'smooth' })}>Explore a talk</ButtonArrow>
        </div>
        <button type="button" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu" className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/30 text-paper md:hidden">
          {menuOpen ? <X size={19} /> : <Menu size={20} />}
        </button>
      </nav>
      {menuOpen && (
        <div className="absolute left-5 right-5 top-16 rounded-2xl border border-paper/15 bg-ink px-6 py-5 shadow-2xl md:hidden">
          <div className="flex flex-col gap-1">
            {links.map(([href, label]) => <AnchorLink key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-paper/10 py-3 text-sm text-paper" data-testid={`link-mobile-${label.toLowerCase()}`}>{label}</AnchorLink>)}
            <AnchorLink href="#latest" onClick={() => setMenuOpen(false)} className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-coral px-4 py-2 text-sm font-semibold text-ink" data-testid="link-mobile-explore">Explore a talk <ArrowUpRight size={15} /></AnchorLink>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ onExplore }: { onExplore: () => void }) {
  return (
    <section id="top" className="relative min-h-[720px] overflow-hidden bg-ink px-5 pb-12 pt-32 text-paper sm:px-8 lg:min-h-[780px] lg:px-12 lg:pt-36">
      <div className="absolute -right-28 -top-32 h-[440px] w-[440px] rounded-full border border-paper/10 sm:h-[600px] sm:w-[600px]" />
      <div className="absolute -right-16 top-14 h-[300px] w-[300px] rounded-full border border-paper/10 sm:h-[410px] sm:w-[410px]" />
      <div className="relative mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-end lg:gap-20">
        <div className="max-w-2xl">
          <p className="eyebrow animate-rise-in text-coral">A conversation-led media platform</p>
          <h1 className="animate-rise-in delay-100 mt-6 max-w-xl text-[4rem] leading-[0.91] tracking-[-0.06em] sm:text-[6.8rem] lg:text-[8.1rem]">
            Better<br /><span className="font-editorial font-normal italic text-coral">questions.</span>
          </h1>
          <p className="animate-rise-in delay-200 mt-8 max-w-sm text-base leading-relaxed text-paper/65 sm:text-lg">Thoughtful talks, sharp ideas, and human stories worth carrying into your day.</p>
          <div className="animate-rise-in delay-300 mt-9 flex flex-wrap items-center gap-5">
            <ButtonArrow dark onClick={onExplore} testId="button-hero-explore">Find your next idea</ButtonArrow>
            <AnchorLink href="#about" className="group inline-flex items-center gap-2 text-sm text-paper/60 transition-colors hover:text-paper" data-testid="link-hero-about">Why ABTalks <ArrowDownRight size={16} className="transition-transform group-hover:translate-y-1 group-hover:translate-x-1" /></AnchorLink>
          </div>
        </div>
        <div className="relative animate-rise-in delay-300 mx-auto w-full max-w-[540px] lg:mb-2">
          <div className="relative aspect-[1.08/1] overflow-hidden rounded-[1.4rem] bg-cobalt shadow-2xl shadow-black/20">
            <img src="/abtalks-editorial-still.jpg" alt="A warm editorial still life with a microphone and notebook" className="h-full w-full object-cover mix-blend-multiply opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
            <div className="absolute left-5 top-5 rounded-full bg-paper px-3 py-2 font-data text-[0.62rem] uppercase tracking-[0.14em] text-ink">Now in session</div>
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-paper/55">Listen in</p>
                <p className="mt-1 max-w-[230px] font-editorial text-2xl leading-none text-paper">The radical act of paying attention</p>
              </div>
              <button type="button" onClick={onExplore} data-testid="button-hero-play" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-coral text-ink transition-transform duration-300 hover:scale-110"><Play size={20} fill="currentColor" className="ml-1" /></button>
            </div>
          </div>
          <div className="animate-drift absolute -bottom-6 -left-5 hidden w-36 rotate-[-4deg] border border-ink/10 bg-saffron px-4 py-3 text-ink shadow-lg sm:block">
            <p className="font-editorial text-lg leading-[0.95]">Come for<br />the question.</p>
            <div className="mt-3 flex justify-end"><ArrowDownRight size={18} /></div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-5 hidden items-center gap-3 text-paper/40 sm:flex lg:left-12"><span className="h-px w-10 bg-paper/30" /><span className="eyebrow">Scroll to wander</span></div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="overflow-hidden border-b border-ink/10 bg-saffron py-3 text-ink">
      <div className="animate-ticker flex w-max items-center gap-8 whitespace-nowrap">
        {[...Array(2)].flatMap((_, i) => ['LISTEN SLOWLY', 'THINK WIDELY', 'STAY CURIOUS', 'TAKE IT WITH YOU'].map((item, j) => <span key={`${i}-${j}`} className="flex items-center gap-8 text-[0.7rem] font-bold tracking-[0.18em]"><span className="text-coral">✳</span>{item}</span>))}
      </div>
    </div>
  );
}

function TalkCard({ talk, onPlay, featured = false }: { talk: Talk; onPlay: (talk: Talk) => void; featured?: boolean }) {
  const tones: Record<string, string> = { cobalt: 'bg-cobalt text-paper', coral: 'bg-coral text-ink', teal: 'bg-teal text-paper' };
  return (
    <article className={`group relative overflow-hidden rounded-[1.15rem] ${tones[talk.tone]} ${featured ? 'min-h-[400px] sm:min-h-[500px]' : 'min-h-[340px]'} p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-8`} data-testid={`card-talk-${talk.id}`}>
      {featured && <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border-[1.5px] border-paper/20" />}
      {featured && <div className="absolute -right-4 top-5 h-36 w-36 rounded-full border border-paper/20" />}
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="eyebrow opacity-65">{talk.category}</span>
          <span className="font-data text-xs opacity-60">{talk.number}</span>
        </div>
        <div className="mt-20">
          <h3 className={`max-w-[500px] font-editorial leading-[0.95] ${featured ? 'text-[3.2rem] sm:text-[4.2rem]' : 'text-[2.8rem]'}`}>{talk.title}</h3>
          <p className="mt-5 text-sm opacity-75">{talk.person} <span className="mx-1 opacity-50">/</span> {talk.detail}</p>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <span className="flex items-center gap-2 font-data text-[0.65rem] uppercase tracking-[0.08em] opacity-65"><Headphones size={14} /> {talk.duration}</span>
          <button type="button" onClick={() => onPlay(talk)} data-testid={`button-play-${talk.id}`} className="flex h-11 w-11 items-center justify-center rounded-full border border-current transition-all duration-300 hover:bg-ink hover:text-paper"><Play size={16} fill="currentColor" className="ml-0.5" /></button>
        </div>
      </div>
    </article>
  );
}

function Latest({ onPlay }: { onPlay: (talk: Talk) => void }) {
  return (
    <section id="latest" className="bg-background px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div><p className="eyebrow text-coral">The latest</p><h2 className="mt-4 max-w-md text-[3.2rem] leading-[0.92] tracking-[-0.06em] sm:text-[4.5rem]">Good things<br /><span className="font-editorial font-normal italic text-teal">to think about.</span></h2></div>
          <span className="hidden pb-2 font-data text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground sm:block">03 / 09 this week</span>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.28fr_.72fr]">
          <TalkCard talk={talks[0]} onPlay={onPlay} featured />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <TalkCard talk={talks[1]} onPlay={onPlay} />
            <TalkCard talk={talks[2]} onPlay={onPlay} />
          </div>
        </div>
        <div className="mt-10 flex justify-end"><AnchorLink href="#topics" className="group inline-flex items-center gap-3 text-sm font-semibold" data-testid="link-all-talks">Browse by feeling <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/30 transition-all duration-300 group-hover:border-coral group-hover:bg-coral"><ChevronRight size={16} /></span></AnchorLink></div>
      </div>
    </section>
  );
}

function Topics() {
  const colors = ['bg-coral', 'bg-teal text-paper', 'bg-saffron', 'bg-cobalt text-paper', 'bg-ink text-paper'];
  return (
    <section id="topics" className="overflow-hidden bg-cream px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
          <div><p className="eyebrow text-coral">Take a turn</p><h2 className="mt-4 text-[3.25rem] leading-[0.9] tracking-[-0.06em] sm:text-[4.7rem]">What are<br /><span className="font-editorial font-normal italic text-cobalt">you into?</span></h2><p className="mt-7 max-w-xs text-sm leading-relaxed text-muted-foreground">No algorithmic rabbit holes. Just a few generous places to start wandering.</p></div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {topics.map((topic, index) => <button type="button" key={topic} onClick={() => document.querySelector('#latest')?.scrollIntoView({ behavior: 'smooth' })} data-testid={`button-topic-${index}`} className={`group ${colors[index]} flex items-center gap-3 rounded-full px-5 py-3.5 text-sm font-semibold transition-transform duration-300 hover:-translate-y-1`}><span>{topic}</span><Plus size={15} className="transition-transform duration-300 group-hover:rotate-90" /></button>)}
          </div>
        </div>
        <div className="mt-20 border-t border-ink/15 pt-5"><div className="flex items-center justify-between"><span className="eyebrow text-muted-foreground">A small promise</span><span className="font-data text-[0.65rem] text-muted-foreground">AB / 2025</span></div><p className="mt-10 max-w-4xl text-[2.6rem] leading-[0.97] tracking-[-0.05em] sm:text-[4.5rem]">The best conversations don't hand you answers. <span className="font-editorial font-normal italic text-coral">They make better questions feel possible.</span></p></div>
      </div>
    </section>
  );
}

function About() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (email.trim()) setJoined(true); };
  return (
    <section id="about" className="bg-ink px-5 py-24 text-paper sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1320px] gap-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
        <div><p className="eyebrow text-coral">Why we're here</p><h2 className="mt-5 max-w-md text-[3.4rem] leading-[0.9] tracking-[-0.06em] sm:text-[5rem]">Pull up<br />a <span className="font-editorial font-normal italic text-saffron">chair.</span></h2><p className="mt-8 max-w-sm text-base leading-relaxed text-paper/60">ABTalks is a room for people who still believe a good idea can change the shape of an ordinary Tuesday.</p><AnchorLink href="#top" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-paper transition-colors hover:text-coral" data-testid="link-back-top">Back to the top <ArrowUpRight size={16} /></AnchorLink></div>
        <div className="flex flex-col justify-between">
          <p className="max-w-xl font-editorial text-[2.5rem] leading-[0.98] text-paper sm:text-[4rem]">We look for the spark in the side note, the story behind the story, the question nobody thought to ask out loud.</p>
          <div className="mt-16 border-t border-paper/20 pt-6">
            <div className="flex items-end justify-between gap-8"><div><p className="eyebrow text-paper/45">A note for your inbox</p><p className="mt-3 text-sm text-paper/60">One thoughtful dispatch, twice a month.</p></div><span className="font-data text-xs text-coral">01 / 01</span></div>
            {joined ? <div className="mt-7 flex items-center gap-3 rounded-lg bg-teal px-4 py-4 text-sm text-paper" data-testid="status-newsletter-success"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-saffron text-ink"><Check size={15} /></span>You're on the list. See you in the good part.</div> : <form onSubmit={submit} className="mt-7 flex max-w-lg border-b border-paper/35 pb-2 focus-within:border-coral"><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" aria-label="Your email address" data-testid="input-newsletter-email" className="min-w-0 flex-1 bg-transparent py-2 text-sm text-paper outline-none placeholder:text-paper/40" /><button type="submit" data-testid="button-newsletter-submit" className="flex items-center gap-2 text-sm font-semibold text-coral transition-colors hover:text-saffron">I'm in <ArrowUpRight size={16} /></button></form>}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="bg-ink px-5 pb-8 text-paper sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1320px] flex-col gap-8 border-t border-paper/20 pt-8 sm:flex-row sm:items-end sm:justify-between"><Logo inverse /><div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-paper/45"><AnchorLink href="#latest" data-testid="link-footer-latest">Latest</AnchorLink><AnchorLink href="#topics" data-testid="link-footer-topics">Topics</AnchorLink><AnchorLink href="#about" data-testid="link-footer-about">About</AnchorLink><span>© 2025 ABTalks</span></div></div></footer>;
}

function NowPlaying({ talk, onClose }: { talk: Talk; onClose: () => void }) {
  return <div className="fixed bottom-4 left-4 right-4 z-40 mx-auto flex max-w-2xl items-center gap-4 rounded-2xl bg-ink p-3 pl-4 text-paper shadow-2xl shadow-ink/30 sm:bottom-6 sm:pl-5" data-testid="status-now-playing"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral text-ink"><Play size={15} fill="currentColor" /></div><div className="min-w-0 flex-1"><p className="eyebrow text-coral">Now playing</p><p className="truncate text-sm font-semibold">{talk.title}</p></div><span className="hidden font-data text-[0.62rem] text-paper/50 sm:block">{talk.duration}</span><button type="button" onClick={onClose} aria-label="Close player" data-testid="button-close-player" className="flex h-8 w-8 items-center justify-center rounded-full text-paper/60 transition-colors hover:bg-paper/10 hover:text-paper"><X size={16} /></button></div>;
}

function Home(): ReactElement {
  const [playing, setPlaying] = useState<Talk | null>(null);
  const explore = () => document.querySelector('#latest')?.scrollIntoView({ behavior: 'smooth' });
  return <div className="paper-grain min-h-[100dvh] overflow-x-hidden bg-background"><Hero onExplore={explore} /><Nav /><Marquee /><Latest onPlay={setPlaying} /><Topics /><About /><Footer />{playing && <NowPlaying talk={playing} onClose={() => setPlaying(null)} />}</div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;