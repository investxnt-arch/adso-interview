content = '''import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { signOut } from "@/lib/auth"

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/login")

  const stats = [
    {label:"PODCASTS",value:"0",color:"#FFE500"},
    {label:"EPISODES",value:"0",color:"#00FFD1"},
    {label:"TOTAL PLAYS",value:"0",color:"#FF006E"},
    {label:"SUBSCRIBERS",value:"0",color:"#FFE500"},
  ]

  const nav = [
    {href:"/dashboard",label:"DASHBOARD",icon:"▣"},
    {href:"/dashboard/podcasts",label:"PODCASTS",icon:"🎙"},
    {href:"/dashboard/episodes",label:"EPISODES",icon:"🎵"},
    {href:"/dashboard/profile",label:"PROFILE",icon:"◉"},
    {href:"/dashboard/settings",label:"SETTINGS",icon:"⚙"},
  ]

  return (
    <main style={{background:"#0a0a0a",minHeight:"100vh",color:"#fff",fontFamily:"monospace"}}>
      <nav style={{borderBottom:"3px solid #FFE500",padding:"1rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#0a0a0a"}}>
        <div style={{fontSize:"1.5rem",fontWeight:"900",letterSpacing:"4px",color:"#FFE500"}}>ADSO<span style={{color:"#00FFD1"}}>TUBE</span></div>
        <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
          <span style={{color:"#666",fontSize:"0.75rem"}}>{session.user?.name}</span>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }) }}>
            <button style={{background:"#FF006E",color:"#fff",border:"none",padding:"8px 16px",fontFamily:"monospace",fontSize:"0.8rem",letterSpacing:"2px",cursor:"pointer"}}>SIGN OUT</button>
          </form>
        </div>
      </nav>
      <div style={{display:"flex",minHeight:"calc(100vh - 60px)"}}>
        <aside style={{width:"220px",borderRight:"3px solid #222",padding:"2rem 0",background:"#0d0d0d"}}>
          {nav.map(item => (
            <a key={item.href} href={item.href} style={{display:"flex",alignItems:"center",gap:"12px",padding:"12px 2rem",color:"#aaa",textDecoration:"none",fontSize:"0.8rem",letterSpacing:"2px"}}>
              <span>{item.icon}</span>{item.label}
            </a>
          ))}
        </aside>
        <div style={{flex:1,padding:"2rem"}}>
          <div style={{marginBottom:"2rem"}}>
            <div style={{color:"#FF006E",fontSize:"0.7rem",letterSpacing:"3px",marginBottom:"8px"}}>OVERVIEW</div>
            <h1 style={{fontSize:"2rem",fontWeight:"900",letterSpacing:"2px"}}>DASHBOARD</h1>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1.5rem",marginBottom:"2rem"}}>
            {stats.map(stat => (
              <div key={stat.label} style={{border:"3px solid "+stat.color,background:"#111",padding:"1.5rem",boxShadow:"6px 6px 0 "+stat.color}}>
                <div style={{fontSize:"0.65rem",letterSpacing:"3px",color:stat.color,marginBottom:"8px"}}>{stat.label}</div>
                <div style={{fontSize:"2.5rem",fontWeight:"900"}}>{stat.value}</div>
              </div>
            ))}
          </div>
          <div style={{border:"3px solid #222",background:"#111",padding:"2rem"}}>
            <div style={{fontSize:"0.7rem",letterSpacing:"3px",color:"#FFE500",marginBottom:"1rem"}}>QUICK ACTIONS</div>
            <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
              <a href="/dashboard/podcasts/new" style={{background:"#FFE500",color:"#000",border:"3px solid #000",padding:"12px 24px",fontFamily:"monospace",fontWeight:"bold",fontSize:"0.85rem",letterSpacing:"2px",textDecoration:"none",boxShadow:"4px 4px 0 #00FFD1"}}>+ NEW PODCAST</a>
              <a href="/dashboard/episodes/new" style={{color:"#00FFD1",border:"3px solid #00FFD1",padding:"12px 24px",fontFamily:"monospace",fontWeight:"bold",fontSize:"0.85rem",letterSpacing:"2px",textDecoration:"none",boxShadow:"4px 4px 0 #FF006E"}}>+ NEW EPISODE</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}'''

with open('app/dashboard/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')
