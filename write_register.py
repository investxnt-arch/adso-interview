content = '''"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const formData = new FormData(e.currentTarget)
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: formData.get("name"), email: formData.get("email"), password: formData.get("password") })
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error || "Error"); setLoading(false); return }
    router.push("/login")
  }

  return (
    <main style={{background:"#0a0a0a",minHeight:"100vh",color:"#fff",fontFamily:"monospace",display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
      <div style={{width:"100%",maxWidth:"400px"}}>
        <div style={{textAlign:"center",marginBottom:"2rem"}}>
          <div style={{fontSize:"2.5rem",fontWeight:"900",letterSpacing:"4px",color:"#FFE500"}}>ADSO<span style={{color:"#00FFD1"}}>TUBE</span></div>
          <div style={{color:"#666",fontSize:"0.75rem",letterSpacing:"3px",marginTop:"8px"}}>CREATE ACCOUNT</div>
        </div>
        <div style={{border:"3px solid #00FFD1",background:"#111",padding:"2rem",boxShadow:"8px 8px 0 #00FFD1"}}>
          {error && <div style={{background:"#FF006E",color:"#fff",padding:"10px",marginBottom:"1rem",fontSize:"0.8rem",letterSpacing:"1px"}}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div style={{marginBottom:"1.2rem"}}>
              <div style={{color:"#00FFD1",fontSize:"0.7rem",letterSpacing:"2px",marginBottom:"6px"}}>NAME</div>
              <input name="name" type="text" required style={{width:"100%",background:"#000",border:"2px solid #333",color:"#fff",padding:"10px",fontFamily:"monospace",fontSize:"0.9rem",outline:"none",boxSizing:"border-box"}} />
            </div>
            <div style={{marginBottom:"1.2rem"}}>
              <div style={{color:"#00FFD1",fontSize:"0.7rem",letterSpacing:"2px",marginBottom:"6px"}}>EMAIL</div>
              <input name="email" type="email" required style={{width:"100%",background:"#000",border:"2px solid #333",color:"#fff",padding:"10px",fontFamily:"monospace",fontSize:"0.9rem",outline:"none",boxSizing:"border-box"}} />
            </div>
            <div style={{marginBottom:"1.5rem"}}>
              <div style={{color:"#00FFD1",fontSize:"0.7rem",letterSpacing:"2px",marginBottom:"6px"}}>PASSWORD</div>
              <input name="password" type="password" required style={{width:"100%",background:"#000",border:"2px solid #333",color:"#fff",padding:"10px",fontFamily:"monospace",fontSize:"0.9rem",outline:"none",boxSizing:"border-box"}} />
            </div>
            <button type="submit" style={{width:"100%",background:"#00FFD1",color:"#000",border:"3px solid #000",padding:"14px",fontFamily:"monospace",fontWeight:"bold",fontSize:"1rem",letterSpacing:"2px",cursor:"pointer",boxShadow:"4px 4px 0 #FFE500"}}>
              {loading ? "LOADING..." : "CREATE ACCOUNT"}
            </button>
          </form>
          <div style={{textAlign:"center",marginTop:"1.5rem",fontSize:"0.75rem",color:"#666"}}>ALREADY HAVE AN ACCOUNT? <a href="/login" style={{color:"#FFE500",textDecoration:"none"}}>SIGN IN</a></div>
        </div>
      </div>
    </main>
  )
}'''

with open('app/register/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')
