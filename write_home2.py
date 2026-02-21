with open('app/page.tsx', 'w', encoding='utf-8') as f:
    f.write("""export default function HomePage() {
  return (
    <div style={{background:'#0a0a0a',minHeight:'100vh',fontFamily:'monospace',color:'#fff'}}>
      <style>{
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        :root {
          --yellow: #FFE500;
          --cyan: #00FFD1;
          --magenta: #FF006E;
          --dark: #0a0a0a;
          --gray: #111;
        }
        .glitch {
          position:relative;
          animation: glitch 3s infinite;
        }
        @keyframes glitch {
          0%,90%,100% { transform: translate(0) }
          92% { transform: translate(-2px,1px); filter: hue-rotate(90deg); }
          94% { transform: translate(2px,-1px); filter: hue-rotate(-90deg); }
          96% { transform: translate(-1px,2px); }
        }
        .scanline::after {
          content:'';
          position:fixed;
          top:0;left:0;right:0;bottom:0;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,209,0.03) 2px, rgba(0,255,209,0.03) 4px);
          pointer-events:none;
          z-index:9999;
        }
        .btn-primary {
          background: var(--yellow);
          color: #000;
          border: 3px solid #000;
          padding: 14px 32px;
          font-family: 'Bebas Neue', monospace;
          font-size: 1.2rem;
          letter-spacing: 2px;
          cursor: pointer;
          box-shadow: 6px 6px 0 var(--cyan);
          transition: all 0.1s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary:hover {
          transform: translate(3px,3px);
          box-shadow: 3px 3px 0 var(--cyan);
        }
        .btn-secondary {
          background: transparent;
          color: var(--cyan);
          border: 3px solid var(--cyan);
          padding: 14px 32px;
          font-family: 'Bebas Neue', monospace;
          font-size: 1.2rem;
          letter-spacing: 2px;
          cursor: pointer;
          box-shadow: 6px 6px 0 var(--magenta);
          transition: all 0.1s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-secondary:hover {
          transform: translate(3px,3px);
          box-shadow: 3px 3px 0 var(--magenta);
        }
        .card {
          border: 3px solid var(--yellow);
          background: #111;
          box-shadow: 8px 8px 0 var(--yellow);
          padding: 2rem;
          transition: all 0.1s;
        }
        .card:hover {
          transform: translate(4px,4px);
          box-shadow: 4px 4px 0 var(--yellow);
        }
        .tag {
          background: var(--magenta);
          color: #fff;
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          padding: 4px 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          display: inline-block;
        }
        nav a { text-decoration: none; }
      }</style>
      <div className='scanline' />

      {/* NAVBAR */}
      <nav style={{borderBottom:'3px solid var(--yellow)',padding:'1rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between',background:'#0a0a0a',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{width:'36px',height:'36px',background:'var(--yellow)',border:'3px solid #fff',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{fontSize:'1.2rem'}}>▶</span>
          </div>
          <span style={{fontFamily:'Bebas Neue',fontSize:'1.8rem',letterSpacing:'4px',color:'var(--yellow)'}}>ADSO<span style={{color:'var(--cyan)'}}>TUBE</span></span>
        </div>
        <div style={{display:'flex',gap:'1rem',alignItems:'center'}}>
          <a href='/login' style={{color:'#aaa',fontFamily:'Space Mono',fontSize:'0.8rem',letterSpacing:'2px',textDecoration:'none',textTransform:'uppercase'}}>LOGIN</a>
          <a href='/register' className='btn-primary'>GET STARTED</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{padding:'5rem 2rem',maxWidth:'1200px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4rem',alignItems:'center'}}>
        <div>
          <span className='tag'>🎙️ PODCAST PLATFORM</span>
          <h1 className='glitch' style={{fontFamily:'Bebas Neue',fontSize:'6rem',lineHeight:'0.9',marginTop:'1rem',letterSpacing:'2px'}}>
            CREATE<br/>
            <span style={{color:'var(--yellow)',WebkitTextStroke:'2px var(--yellow)'}}>SHARE</span><br/>
            <span style={{color:'var(--cyan)'}}>DOMINATE</span>
          </h1>
          <p style={{fontFamily:'Space Mono',fontSize:'0.85rem',color:'#aaa',marginTop:'2rem',lineHeight:'1.8',maxWidth:'400px'}}>
            Upload audio & video. Build your audience.<br/>
            No limits. No excuses. Just content.
          </p>
          <div style={{display:'flex',gap:'1rem',marginTop:'2.5rem',flexWrap:'wrap'}}>
            <a href='/register' className='btn-primary'>▶ START NOW</a>
            <a href='/login' className='btn-secondary'>LOGIN</a>
          </div>
        </div>
        <div style={{position:'relative'}}>
          <div style={{border:'3px solid var(--cyan)',background:'#111',padding:'2rem',boxShadow:'12px 12px 0 var(--magenta)'}}>
            <div style={{background:'#000',border:'2px solid #333',padding:'1.5rem',marginBottom:'1rem'}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'1rem'}}>
                <div style={{width:'48px',height:'48px',background:'var(--yellow)',border:'2px solid #000',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Bebas Neue',fontSize:'1.5rem',color:'#000'}}>P</div>
                <div>
                  <div style={{fontFamily:'Bebas Neue',fontSize:'1.1rem',color:'var(--yellow)'}}>MY FIRST PODCAST</div>
                  <div style={{fontFamily:'Space Mono',fontSize:'0.7rem',color:'#666'}}>12 EPISODES</div>
                </div>
              </div>
              <div style={{background:'#111',height:'4px',marginBottom:'8px'}}>
                <div style={{background:'var(--cyan)',height:'100%',width:'65%'}}></div>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',fontFamily:'Space Mono',fontSize:'0.7rem',color:'#666'}}>
                <span>▶ PLAYING EP.07</span>
                <span>24:31 / 37:45</span>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
              {['1.2K PLAYS','89 SUBS','12 EPS','4.8★'].map(stat => (
                <div key={stat} style={{border:'2px solid #333',padding:'12px',textAlign:'center'}}>
                  <div style={{fontFamily:'Bebas Neue',fontSize:'1.3rem',color:'var(--yellow)'}}>{stat.split(' ')[0]}</div>
                  <div style={{fontFamily:'Space Mono',fontSize:'0.65rem',color:'#666'}}>{stat.split(' ')[1]}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{position:'absolute',top:'-12px',right:'-12px',background:'var(--magenta)',color:'#fff',fontFamily:'Bebas Neue',fontSize:'0.9rem',padding:'4px 12px',letterSpacing:'2px'}}>LIVE</div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{borderTop:'3px solid #222',borderBottom:'3px solid #222',background:'#0d0d0d',padding:'4rem 2rem'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'3rem'}}>
            <div style={{flex:1,height:'3px',background:'var(--yellow)'}}></div>
            <h2 style={{fontFamily:'Bebas Neue',fontSize:'2.5rem',letterSpacing:'4px',color:'var(--yellow)',whiteSpace:'nowrap'}}>WHAT YOU GET</h2>
            <div style={{flex:1,height:'3px',background:'var(--yellow)'}}></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.5rem'}}>
            {[
              {icon:'🎬',title:'UPLOAD ANYTHING',desc:'MP3, WAV, MP4, MOV. Audio or video. We handle it all via Cloudinary CDN.',color:'var(--yellow)'},
              {icon:'📊',title:'REAL ANALYTICS',desc:'Track plays, subscribers, and growth with a brutal dashboard.',color:'var(--cyan)'},
              {icon:'🔐',title:'SECURE AUTH',desc:'Email, Google, GitHub. Your data is locked down tight.',color:'var(--magenta)'},
              {icon:'🎵',title:'EPISODE MGMT',desc:'Organize episodes by podcast. Keep your content structured.',color:'var(--cyan)'},
              {icon:'☁️',title:'CLOUD NATIVE',desc:'PostgreSQL on Supabase. Deployed on Vercel. Always online.',color:'var(--magenta)'},
              {icon:'🌐',title:'PUBLIC PAGES',desc:'Share your podcast with the world. No login required to listen.',color:'var(--yellow)'},
            ].map(f => (
              <div key={f.title} className='card' style={{borderColor:f.color,boxShadow:8px 8px 0 }}>
                <div style={{fontSize:'2rem',marginBottom:'0.5rem'}}>{f.icon}</div>
                <h3 style={{fontFamily:'Bebas Neue',fontSize:'1.3rem',letterSpacing:'2px',color:f.color,marginBottom:'0.5rem'}}>{f.title}</h3>
                <p style={{fontFamily:'Space Mono',fontSize:'0.75rem',color:'#888',lineHeight:'1.7'}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'5rem 2rem',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'600px',height:'600px',background:'radial-gradient(circle,rgba(255,229,0,0.05) 0%,transparent 70%)',pointerEvents:'none'}}></div>
        <span className='tag'>FREE FOREVER</span>
        <h2 style={{fontFamily:'Bebas Neue',fontSize:'4rem',marginTop:'1rem',letterSpacing:'3px'}}>
          READY TO <span style={{color:'var(--yellow)'}}>UPLOAD</span>?
        </h2>
        <p style={{fontFamily:'Space Mono',fontSize:'0.85rem',color:'#666',marginTop:'1rem',marginBottom:'2.5rem'}}>
          Join ADSO Tube. Start your podcast today.
        </p>
        <a href='/register' className='btn-primary' style={{fontSize:'1.4rem',padding:'18px 48px'}}>▶ CREATE ACCOUNT</a>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:'3px solid #222',padding:'1.5rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontFamily:'Bebas Neue',fontSize:'1.2rem',letterSpacing:'3px',color:'var(--yellow)'}}>ADSO<span style={{color:'var(--cyan)'}}>TUBE</span></span>
        <span style={{fontFamily:'Space Mono',fontSize:'0.7rem',color:'#444'}}>© 2026 // BUILT WITH NEXT.JS + SUPABASE</span>
      </footer>
    </div>
  )
}
""")
print('Done')
