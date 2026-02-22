content = '''"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await signIn("credentials", { email: formData.get("email"), password: formData.get("password"), callbackUrl: "/dashboard" })
    setLoading(false)
  }

  return (
    <main style={{background:"#0a0a0a",minHeight:"100vh",color:"#fff",fontFamily:"monospace",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:"100%",maxWidth:"420px",padding:"0 1rem"}}>
        <div style={{textAlign:"center",marginBottom:"2rem"}}>
          <b style={{fontSize:"2rem",letterSpacing:"4px",color:"#FFE500"}}>ADSO<span style={{color:"#00FFD1"}}>TUBE</span></b>
          <p style={{color:"#666",fontSize:"0.8rem",letterSpacing:"2px",marginTop:"0.5rem"}}>SIGN IN</p>
        </div>
        <div style={{border:"3px solid #FFE500",background:"#111",boxShadow:"8px 8px 0 #FFE500",padding:"2rem"}}>
          <form onSubmit={handleSubmit}>
            <div style={{marginBottom:"1.5rem"}}>
              <label style={{display:"block",fontSize:"0.75rem",letterSpacing:"2px",color:"#FFE500",marginBottom:"0.5rem"}}>EMAIL</label>
              <input name="email" type="email" required placeholder="you@email.com" style={{width:"100%",background:"#000",border:"2px solid #333",color:"#fff",padding:"10px 14px",fontFamily:"monospace",fontSize:"0.9rem",outline:"none",boxSizing:"border-box"}} />
            </div>
            <div style={{marginBottom:"2rem"}}>
              <label style={{display:"block",fontSize:"0.75rem",letterSpacing:"2px",color:"#FFE500",marginBottom:"0.5rem"}}>PASSWORD</label>
              <input name="password" type="password" required placeholder="........" style={{width:"100%",background:"#000",border:"2px solid #333",color:"#fff",padding:"10px 14px",fontFamily:"monospace",fontSize:"0.9rem",outline:"none",boxSizing:"border-box"}} />
            </div>
            <button type="submit" disabled={loading} style={{width:"100%",background:"#FFE500",color:"#000",border:"3px solid #000",padding:"14px",fontFamily:"monospace",fontWeight:"bold",fontSize:"1rem",letterSpacing:"2px",cursor:"pointer",boxShadow:"4px 4px 0 #00FFD1"}}>
              {loading ? "LOADING..." : "SIGN IN"}
            </button>
          </form>
          <div style={{margin:"1.5rem 0",borderTop:"1px solid #222",paddingTop:"1.5rem",display:"flex",flexDirection:"column",gap:"0.75rem"}}>
            <button onClick={() => signIn("google", {callbackUrl:"/dashboard"})} style={{background:"transparent",color:"#fff",border:"2px solid #333",padding:"12px",fontFamily:"monospace",fontSize:"0.85rem",cursor:"pointer"}}>SIGN IN WITH GOOGLE</button>
            <button onClick={() => signIn("github", {callbackUrl:"/dashboard"})} style={{background:"transparent",color:"#fff",border:"2px solid #333",padding:"12px",fontFamily:"monospace",fontSize:"0.85rem",cursor:"pointer"}}>SIGN IN WITH GITHUB</button>
          </div>
          <p style={{textAlign:"center",fontSize:"0.75rem",color:"#666"}}>NO ACCOUNT? <a href="/register" style={{color:"#FFE500",textDecoration:"none",fontWeight:"bold"}}>SIGN UP</a></p>
        </div>
      </div>
    </main>
  )
}'''

with open('app/login/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')
