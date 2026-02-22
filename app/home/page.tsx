"use client"
export default function HomePage() {
  return (
    <main style={{background:"#0a0a0a",minHeight:"100vh",color:"#fff",fontFamily:"monospace"}}>
      <nav style={{borderBottom:"3px solid #FFE500",padding:"1rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#0a0a0a"}}>
        <b style={{fontSize:"1.5rem",letterSpacing:"4px",color:"#FFE500"}}>ADSO<span style={{color:"#00FFD1"}}>TUBE</span></b>
        <div style={{display:"flex",gap:"1rem"}}>
          <a href="/login" style={{color:"#aaa",textDecoration:"none",fontSize:"0.8rem",letterSpacing:"2px"}}>LOGIN</a>
          <a href="/register" style={{background:"#FFE500",color:"#000",padding:"8px 20px",fontWeight:"bold",textDecoration:"none",boxShadow:"4px 4px 0 #00FFD1"}}>GET STARTED</a>
        </div>
      </nav>
      <section style={{padding:"5rem 2rem",maxWidth:"900px",margin:"0 auto"}}>
        <div style={{background:"#FF006E",color:"#fff",fontSize:"0.7rem",padding:"4px 12px",letterSpacing:"3px",display:"inline-block",marginBottom:"1.5rem"}}>PODCAST PLATFORM</div>
        <h1 style={{fontSize:"5rem",lineHeight:"0.95",fontWeight:"900",marginBottom:"2rem"}}>
          CREATE<br/><span style={{color:"#FFE500"}}>SHARE</span><br/><span style={{color:"#00FFD1"}}>DOMINATE</span>
        </h1>
        <p style={{color:"#aaa",lineHeight:"1.8",maxWidth:"400px",marginBottom:"2.5rem"}}>Upload audio and video. Build your audience. No limits.</p>
        <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
          <a href="/register" style={{background:"#FFE500",color:"#000",border:"3px solid #000",padding:"14px 32px",fontWeight:"bold",textDecoration:"none",boxShadow:"6px 6px 0 #00FFD1"}}>START NOW</a>
          <a href="/login" style={{color:"#00FFD1",border:"3px solid #00FFD1",padding:"14px 32px",fontWeight:"bold",textDecoration:"none",boxShadow:"6px 6px 0 #FF006E"}}>LOGIN</a>
        </div>
      </section>
      <footer style={{borderTop:"3px solid #222",padding:"1.5rem 2rem",display:"flex",justifyContent:"space-between"}}>
        <b style={{color:"#FFE500"}}>ADSO<span style={{color:"#00FFD1"}}>TUBE</span></b>
        <span style={{color:"#444",fontSize:"0.7rem"}}>2026 // NEXT.JS + SUPABASE</span>
      </footer>
    </main>
  )
}
