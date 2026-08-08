import { useState } from "react";
import { Route, Switch, Link } from "wouter";

const styles = `
*{box-sizing:border-box}
body{margin:0;font-family:Inter,system-ui,sans-serif;background:#f7f7f5;color:#151515}
a{text-decoration:none;color:inherit}
.app{min-height:100vh;background:#f7f7f5}
.nav{height:64px;padding:0 20px;display:flex;align-items:center;justify-content:space-between;background:#111;color:white;position:sticky;top:0;z-index:20}
.logo{font-weight:900;font-size:21px;letter-spacing:-1px}
.logo span{color:#b8ff4d}
.navlinks{display:flex;gap:18px;font-size:13px}
.btn{border:0;border-radius:14px;padding:13px 18px;font-weight:800;cursor:pointer}
.primary{background:#b8ff4d;color:#101010}
.dark{background:#151515;color:white}
.outline{background:white;border:1px solid #ddd}
.container{max-width:1050px;margin:auto;padding:0 20px}
.hero{background:#111;color:white;padding:58px 20px 45px}
.hero-inner{max-width:1050px;margin:auto}
.badge{display:inline-flex;padding:8px 12px;border-radius:30px;background:#252525;color:#b8ff4d;font-size:12px;font-weight:800}
.hero h1{font-size:clamp(42px,12vw,82px);line-height:.92;letter-spacing:-4px;margin:22px 0 18px;max-width:800px}
.hero h1 span{color:#b8ff4d}
.hero p{font-size:17px;line-height:1.6;color:#bdbdbd;max-width:570px}
.actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:28px}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:42px}
.stat{background:#1e1e1e;border:1px solid #303030;border-radius:18px;padding:17px}
.stat b{font-size:25px;display:block;color:#b8ff4d}
.stat small{color:#aaa}
.section{padding:45px 0}
.section h2{font-size:32px;letter-spacing:-1.5px;margin:0 0 10px}
.muted{color:#777;line-height:1.5}
.steps{display:grid;gap:12px;margin-top:25px}
.step{background:white;border:1px solid #e4e4e4;border-radius:20px;padding:20px}
.step-num{width:34px;height:34px;border-radius:10px;background:#151515;color:#b8ff4d;display:grid;place-items:center;font-weight:900}
.step h3{margin:15px 0 6px}
.trust{background:#b8ff4d;border-radius:25px;padding:28px;margin-top:25px}
.footer{background:#111;color:white;padding:35px 20px;margin-top:20px}
.dashboard{padding:25px 0 90px}
.greeting{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}
.avatar{width:45px;height:45px;border-radius:50%;background:#151515;color:#b8ff4d;display:grid;place-items:center;font-weight:900}
.streak{background:#151515;color:white;border-radius:25px;padding:24px;position:relative;overflow:hidden}
.streak b{font-size:50px;color:#b8ff4d;display:block;line-height:1}
.streak span{color:#aaa}
.progress{height:9px;background:#ddd;border-radius:20px;overflow:hidden;margin-top:15px}
.progress i{display:block;height:100%;background:#b8ff4d;border-radius:20px}
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:12px}
.card{background:white;border:1px solid #e4e4e4;border-radius:20px;padding:18px}
.card h3{margin:0 0 7px}
.big{font-size:30px;font-weight:900}
.task{margin-top:18px;background:white;border:1px solid #ddd;border-radius:22px;padding:20px}
.task .tag{font-size:11px;font-weight:900;color:#666}
.task h2{font-size:24px;margin:8px 0}
.checks{display:grid;gap:10px;margin-top:15px}
.check{display:flex;align-items:center;gap:10px;padding:13px;border-radius:13px;background:#f4f4f2}
.check.done{background:#efffdc}
.day{padding:25px 0 80px}
.back{font-size:13px;color:#666;display:inline-block;margin-bottom:22px}
.dayhero{background:#151515;color:white;border-radius:25px;padding:25px}
.daynumber{color:#b8ff4d;font-weight:900;font-size:13px}
.dayhero h1{font-size:34px;line-height:1;letter-spacing:-1.5px;margin:12px 0}
.dayhero p{color:#bbb;line-height:1.55}
.require{margin-top:18px;background:#222;border-radius:15px;padding:15px}
.require div{display:flex;gap:9px;margin:9px 0;font-size:13px;color:#ddd}
.formcard{background:white;border:1px solid #ddd;border-radius:22px;padding:20px;margin-top:15px}
label{font-size:13px;font-weight:800;display:block;margin:15px 0 7px}
input{width:100%;padding:14px;border:1px solid #d7d7d7;border-radius:12px;font-size:14px}
.submit{width:100%;margin-top:18px}
.achievements{display:flex;gap:8px;overflow:auto;margin-top:15px}
.achievement{min-width:90px;text-align:center;background:white;border:1px solid #ddd;border-radius:16px;padding:12px;font-size:12px}
.achievement strong{font-size:23px;display:block}
@media(min-width:700px){
 .hero{padding:90px 30px 65px}
 .steps{grid-template-columns:repeat(3,1fr)}
 .dashboard,.day{padding-top:45px}
 .grid{grid-template-columns:repeat(4,1fr)}
}
`;

function Layout({children}:{children:any}){
 return <div className="app">
  <style>{styles}</style>
  <nav className="nav">
   <Link href="/"><div className="logo">AB<span>TALKS</span></div></Link>
   <div className="navlinks">
    <Link href="/">Home</Link>
    <Link href="/dashboard">Dashboard</Link>
   </div>
  </nav>
  {children}
 </div>
}

function Landing(){
 return <Layout>
  <section className="hero">
   <div className="hero-inner">
    <div className="badge">60-DAY BUILD CHALLENGE</div>
    <h1>Build daily.<br/><span>Be visible.</span></h1>
    <p>Turn 60 days of coding into proof of work that recruiters can see. Pick a track, build every day, and share your progress.</p>
    <div className="actions">
     <Link href="/dashboard"><button className="btn primary">Start your 60 days →</button></Link>
     <a href="#how"><button className="btn dark" style={{border:"1px solid #444"}}>How it works</button></a>
    </div>
    <div className="stats">
     <div className="stat"><b>60</b><small>Days to build</small></div>
     <div className="stat"><b>2</b><small>Proofs per day</small></div>
     <div className="stat"><b>1</b><small>Public streak</small></div>
    </div>
   </div>
  </section>

  <main className="container">
   <section className="section" id="how">
    <h2>Small proof. Every day.</h2>
    <p className="muted">ABTalks turns consistency into something you can actually show.</p>
    <div className="steps">
     <div className="step"><div className="step-num">01</div><h3>Pick a track</h3><p className="muted">Choose what you want to learn and commit to 60 days.</p></div>
     <div className="step"><div className="step-num">02</div><h3>Build today</h3><p className="muted">Complete one focused coding task and ship something real.</p></div>
     <div className="step"><div className="step-num">03</div><h3>Show your work</h3><p className="muted">Submit GitHub and LinkedIn proof to keep your streak alive.</p></div>
    </div>
   </section>

   <section className="trust">
    <h2>60 days can change your profile.</h2>
    <p>Build a public learning streak, create projects and become visible to the people who matter.</p>
    <Link href="/dashboard"><button className="btn dark">Explore the dashboard →</button></Link>
   </section>
  </main>
  <footer className="footer"><div className="container"><b>ABTALKS</b><p style={{color:"#888"}}>Build in public. Grow with proof.</p></div></footer>
 </Layout>
}

function Dashboard(){
 const [missed,setMissed]=useState(false);
 return <Layout>
  <main className="container dashboard">
   <div className="greeting">
    <div><p className="muted" style={{margin:0}}>Welcome back</p><h1 style={{margin:"4px 0"}}>Krish 👋</h1></div>
    <div className="avatar">K</div>
   </div>

   <section className="streak">
    <span>{missed ? "STREAK NEEDS A RESET" : "CURRENT STREAK"}</span>
    <b>{missed ? "0" : "11"} days</b>
    <span>{missed ? "You missed yesterday. Today is a fresh start." : "You're on a roll. Keep building."}</span>
    <div className="progress"><i style={{width:"20%"}}/></div>
    <small style={{color:"#aaa"}}>Day 12 of 60 • 20% complete</small>
   </section>

   <div className="grid">
    <div className="card"><div className="muted">Overall</div><div className="big">20%</div></div>
    <div className="card"><div className="muted">Standing</div><div className="big">#128</div></div>
    <div className="card"><div className="muted">GitHub</div><div className="big">✓</div></div>
    <div className="card"><div className="muted">LinkedIn</div><div className="big">✓</div></div>
   </div>

   <section className="task">
    <div className="tag">TODAY • DAY 12</div>
    <h2>Build a responsive landing page</h2>
    <p className="muted">Create a mobile-first landing page with a clear hero section, feature cards and a strong call to action.</p>
    <div className="checks">
     <div className="check done">✓ GitHub proof ready</div>
     <div className="check done">✓ LinkedIn post ready</div>
     <div className="check">○ Submit today's work</div>
    </div>
    <Link href="/day/12"><button className="btn primary" style={{width:"100%",marginTop:15}}>Open Day 12 →</button></Link>
   </section>

   <section className="section" style={{paddingBottom:20}}>
    <h2>Achievements</h2>
    <div className="achievements">
     <div className="achievement"><strong>🔥</strong>7 Day Streak</div>
     <div className="achievement"><strong>🚀</strong>First Ship</div>
     <div className="achievement"><strong>💻</strong>10 Builds</div>
     <div className="achievement"><strong>⭐</strong>Rising</div>
    </div>
   </section>

   <button className="btn outline" onClick={()=>setMissed(!missed)}>
    {missed ? "Show active streak" : "Preview missed-day state"}
   </button>
  </main>
 </Layout>
}

function ChallengeDay(){
 const [submitted,setSubmitted]=useState(false);
 return <Layout>
  <main className="container day">
   <Link href="/dashboard" className="back">← Back to dashboard</Link>

   <section className="dayhero">
    <div className="daynumber">DAY 12 / 60</div>
    <h1>Build a responsive landing page.</h1>
    <p>Today you'll turn a simple idea into a polished mobile-first landing page.</p>
    <div className="require">
     <b>Today's checklist</b>
     <div>✓ Hero section with clear value proposition</div>
     <div>✓ At least three feature cards</div>
     <div>✓ Responsive mobile layout</div>
     <div>✓ Working call-to-action</div>
    </div>
   </section>

   <section className="formcard">
    <h2 style={{marginTop:0}}>Show your proof</h2>
    <p className="muted">One build. Two public signals.</p>

    <label>GitHub repository / commit</label>
    <input placeholder="https://github.com/username/project/commit/..." />

    <label>LinkedIn post</label>
    <input placeholder="https://linkedin.com/posts/..." />

    <button className="btn primary submit" onClick={()=>setSubmitted(true)}>
     {submitted ? "✓ Day 12 submitted" : "Submit today's proof →"}
    </button>

    {submitted && <div className="check done" style={{marginTop:12}}>Your Day 12 proof is recorded. Keep the streak going!</div>}
   </section>

   <section className="formcard">
    <h3>Need a hint?</h3>
    <p className="muted">Start with the mobile layout. Make the first screen understandable in five seconds, then add details below.</p>
   </section>
  </main>
 </Layout>
}

function App(){
 return <Switch>
  <Route path="/" component={Landing}/>
  <Route path="/dashboard" component={Dashboard}/>
  <Route path="/day/12" component={ChallengeDay}/>
  <Route> <Layout><main className="container section"><h1>404</h1><Link href="/">Go home</Link></main></Layout></Route>
 </Switch>
}

export default App;
