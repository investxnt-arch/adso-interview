with open('app/page.tsx', 'w', encoding='utf-8') as f:
    f.write("""export default function HomePage() {
  return (
    <div style={{background:'#0a0a0a',minHeight:'100vh',color:'#fff'}}>
      <nav style={{borderBottom:'3px solid #FFE500',padding:'1rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between',background:'#0a0a0a',position:'sticky',top:0,zIndex:100}}>
        <span style={{fontFamily:'monospace',fontSize:'1.8rem',letterSpacing:'4px',color:'#FFE500',fontWeight:'bold'}}>ADSO<span style={{color:'#00FFD1'}}>TUBE</span></span>
        <div style={{display:'flex',gap:'1rem',alignItems:'center'}}>
          <a href='/login' style={{color:'#aaa',fontFamily:'monospace',fontSize:'0.8rem',letterSpacing:'2px',textDecoration:'none',textTransform:'uppercase'}}>LOGIN</a>
          <a href='/register' style={{background:'#FFE500',color:'#000',border:'3px solid #000',padding:'10px 24px',fontFamily:'monospace',fontWeight:'bold',fontSize:'0.9rem',letterSpacing:'2px',textDecoration:'none',boxShadow:'4px 4px 0 #00FFD1'}}>GET STARTED</a>
        </div>
      </nav>
      <section style={{padding:'5rem 2rem',maxWidth:'1200px',margin:'0 auto'}}>
        <div style={{background:'#FF006E',color:'#fff',fontFamily:'monospace',fontSize:'0.7rem',padding:'4px 12px',letterSpacing:'3px',textTransform:'uppercase',display:'inline-block',marginBottom:'1.5rem'}}>🎙️ PODCAST PLATFORM</div>
        <h1 style={{fontFamily:'monospace',fontSize:'5rem',lineHeight:'0.95',fontWeight:'900',letterSpacing:'2px',marginBottom:'2rem'}}>
          CREATE<br/>
          <span style={{color:'#FFE500'}}>SHARE</span><br/>
          <span style={{color:'#00FFD1'}}>DOMINATE</span>
        </h1>
        <p style={{fontFamily:'monospace',fontSize:'0.85rem',color:'#aaa',lineHeight:'1.8',maxWidth:'400px',marginBottom:'2.5rem'}}>Upload audio and video. Build your audience. No limits. No excuses. Just content.</p>
        <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
          <a href='/register' style={{background:'#FFE500',color:'#000',border:'3px solid #000',padding:'14px 32px',fontFamily:'monospace',fontWeight:'bold',fontSize:'1rem',letterSpacing:'2px',textDecoration:'none',boxShadow:'6px 6px 0 #00FFD1'}}>▶ START NOW</a>
          <a href='/login' style={{background:'transparent',color:'#00FFD1',border:'3px solid #00FFD1',padding:'14px 32px',fontFamily:'monospace',fontWeight:'bold',fontSize:'1rem',letterSpacing:'2px',textDecoration:'none',boxShadow:'6px 6px 0 #FF006E'}}>LOGIN</a>
        </div>
      </section>
      <section style={{borderTop:'3px solid #222',borderBottom:'3px solid #222',background:'#0d0d0d',padding:'4rem 2rem'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <h2 style={{fontFamily:'monospace',fontSize:'2rem',letterSpacing:'4px',color:'#FFE500',fontWeight:'900',marginBottom:'3rem',textAlign:'center'}}>// WHAT YOU GET</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'1.5rem'}}>
            {[
              {icon:'🎬',title:'UPLOAD ANYTHING',desc:'MP3, WAV, MP4, MOV. Audio or video.',color:'#FFE500'},
              {icon:'📊',title:'REAL ANALYTICS',desc:'Track plays, subscribers and growth.',color:'#00FFD1'},
              {icon:'🔐',title:'SECURE AUTH',desc:'Email, Google, GitHub login.',color:'#FF006E'},
              {icon:'🎵',title:'EPISODE MGMT',desc:'Organize episodes by podcast.',color:'#00FFD1'},
              {icon:'☁️',title:'CLOUD NATIVE',desc:'Supabase + Vercel. Always online.',color:'#FF006E'},
              {icon:'🌐',title:'PUBLIC PAGES',desc:'Share your podcast with the world.',color:'#FFE500'},
            ].map(f => (
              <div key={f.title} style={{border:3px solid ,background:'#111',boxShadow:8px 8px 0 ,padding:'2rem'}}>
                <div style={{fontSize:'2rem',marginBottom:'0.5rem'}}>{f.icon}</div>
                <h3 style={{fontFamily:'monospace',fontSize:'1rem',letterSpacing:'2px',color:f.color,fontWeight:'900',marginBottom:'0.5rem'}}>{f.title}</h3>
                <p style={{fontFamily:'monospace',fontSize:'0.75rem',color:'#888',lineHeight:'1.7'}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{padding:'5rem 2rem',textAlign:'center'}}>
        <h2 style={{fontFamily:'monospace',fontSize:'3rem',fontWeight:'900',letterSpacing:'3px',marginBottom:'1rem'}}>READY TO <span style={{color:'#FFE500'}}>UPLOAD</span>?</h2>
        <p style={{fontFamily:'monospace',fontSize:'0.85rem',color:'#666',marginBottom:'2.5rem'}}>Join ADSO Tube. Start your podcast today.</p>
        <a href='/register' style={{background:'#FFE500',color:'#000',border:'3px solid #000',padding:'18px 48px',fontFamily:'monospace',fontWeight:'bold',fontSize:'1.2rem',letterSpacing:'2px',textDecoration:'none',boxShadow:'8px 8px 0 #00FFD1'}}>▶ CREATE ACCOUNT</a>
      </section>
      <footer style={{borderTop:'3px solid #222',padding:'1.5rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontFamily:'monospace',fontSize:'1rem',letterSpacing:'3px',color:'#FFE500',fontWeight:'bold'}}>ADSO<span style={{color:'#00FFD1'}}>TUBE</span></span>
        <span style={{fontFamily:'monospace',fontSize:'0.7rem',color:'#444'}}>© 2026 // NEXT.JS + SUPABASE</span>
      </footer>
    </div>
  )
}
""")
print('Done')
