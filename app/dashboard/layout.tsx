import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-black">
      {/* Header con buscador */}
      <header className="fixed top-0 w-full bg-black/95 border-b-4 border-[#FFE500] z-50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <Link href="/dashboard" className="text-3xl font-black flex items-center gap-2">
            <span className="text-[#FFE500]">ADSO</span>
            <span className="text-[#00FFD1]">tube</span>
          </Link>

          {/* SearchBar componente */}
          <div className="flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-[#FFE500] border-2 border-[#FFE500] px-4 py-2 rounded-full">
              {session.user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </header>

      {/* Contenido principal con padding para el header */}
      <div className="pt-20">
        {children}
      </div>
    </div>
  );
}