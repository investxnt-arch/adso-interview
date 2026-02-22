content = '''"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await signIn("credentials", { email: formData.get("email"), password: formData.get("password"), callbackUrl: "/dashboard" })
    setLoading(false)
  }
  return (
    <main style={{background:"#0a0a0a",minHeight:"100vh",color:"#fff",fontFamily:"monospace",display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
      <div style={{width:"100%",maxWidth:"400px"}}>
        <div style={{textAlign:"center",marginBottom:"2rem"}}>
          <div style={{fontSize:"2.5rem",fontWeight:"900",letterSpacing:"4px",color:"#FFE500"}}>ADSO<span style={{color:"#00FFD1"}}>TUBE</span></div>
          <div style={{color:"#666",fontSize:"0.75rem",letterSpacing:"3px",marginTop:"8px"}}>SIGN IN</div>
        </div>
        <div style={{border:"3px solid #FFE500",background:"#111",padding:"2rem",boxShadow:"8px 8px 0 #FFE500"}}>
          <form onSubmit={handleSubmit}>
            <div style={{marginBottom:"1.2rem"}}>
              <div style={{color:"#FFE500",fontSize:"0.7rem",letterSpacing:"2px",marginBottom:"6px"}}>EMAIL</div>
              <input name="email" type="email" required style={{width:"100%",background:"#000",border:"2px solid #333",color:"#fff",padding:"10px",fontFamily:"monospace",fontSize:"0.9rem",outline:"none",boxSizing:"border-box"}} />
            </div>
            <div style={{marginBottom:"1.5rem"}}>
              <div style={{color:"#FFE500",fontSize:"0.7rem",letterSpacing:"2px",marginBottom:"6px"}}>PASSWORD</div>
              <input name="password" type="password" required style={{width:"100%",background:"#000",border:"2px solid #333",color:"#fff",padding:"10px",fontFamily:"monospace",fontSize:"0.9rem",outline:"none",boxSizing:"border-box"}} />
            </div>
            <button type="submit" style={{width:"100%",background:"#FFE500",color:"#000",border:"3px solid #000",padding:"14px",fontFamily:"monospace",fontWeight:"bold",fontSize:"1rem",letterSpacing:"2px",cursor:"pointer",boxShadow:"4px 4px 0 #00FFD1"}}>
              {loading ? "LOADING..." : "SIGN IN"}
            </button>
          </form>
          <div style={{marginTop:"1.5rem",display:"flex",flexDirection:"column" as const,gap:"8px"}}>
            <button onClick={() => signIn("google",{callbackUrl:"/dashboard"})} style={{background:"#000",color:"#fff",border:"2px solid #333",padding:"12px",fontFamily:"monospace",fontSize:"0.8rem",cursor:"pointer",letterSpacing:"1px"}}>GOOGLE</button>
            <button onClick={() => signIn("github",{callbackUrl:"/dashboard"})} style={{background:"#000",color:"#fff",border:"2px solid #333",padding:"12px",fontFamily:"monospace",fontSize:"0.8rem",cursor:"pointer",letterSpacing:"1px"}}>GITHUB</button>
          </div>
          <div style={{textAlign:"center",marginTop:"1.5rem",fontSize:"0.75rem",color:"#666"}}>NO ACCOUNT? <a href="/register" style={{color:"#FFE500",textDecoration:"none"}}>SIGN UP</a></div>
        </div>
      </div>
    </main>
  )
}'''

with open('app/login/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')
