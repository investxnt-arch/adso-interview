import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"

export default async function ProfilePage() {
  const session = await auth()
  if (!session) redirect("/login")

  return (
    <div className="min-h-screen bg-black text-white font-mono p-8">
      <h1 className="text-4xl font-black mb-8">
        <span className="text-[#FF006E]">YOUR</span>{" "}
        <span className="text-[#FFE500]">PROFILE</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Avatar y stats */}
        <Card variant="highlight" className="text-center">
          <div className="w-32 h-32 mx-auto bg-gray-900 border-4 border-[#FFE500] rounded-full flex items-center justify-center mb-4">
            <span className="text-5xl">👤</span>
          </div>
          <h2 className="text-2xl font-bold text-[#FFE500] mb-2">
            {session.user?.name}
          </h2>
          <p className="text-gray-400 mb-4">{session.user?.email}</p>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-[#00FFD1] text-xl font-bold">12</p>
              <p className="text-xs text-gray-500">Podcasts</p>
            </div>
            <div>
              <p className="text-[#00FFD1] text-xl font-bold">48</p>
              <p className="text-xs text-gray-500">Episodes</p>
            </div>
            <div>
              <p className="text-[#00FFD1] text-xl font-bold">1.2K</p>
              <p className="text-xs text-gray-500">Plays</p>
            </div>
          </div>
        </Card>

        {/* Formulario de edición */}
        <Card className="lg:col-span-2">
          <h3 className="text-[#FF006E] text-sm font-bold tracking-wider mb-6">
            EDIT PROFILE
          </h3>
          <form className="space-y-6">
            <Input
              label="DISPLAY NAME"
              defaultValue={session.user?.name || ''}
            />
            <Input
              label="EMAIL"
              type="email"
              defaultValue={session.user?.email || ''}
            />
            <Input
              label="BIO"
              placeholder="Tell your story..."
            />
            <div className="flex gap-4">
              <Button type="submit" variant="primary">SAVE CHANGES</Button>
              <Button variant="outline">CANCEL</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}