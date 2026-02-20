with open('app/dashboard/page.tsx', 'w', encoding='utf-8') as f:
    f.write("""import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { signOut } from '@/lib/auth'

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <div className='min-h-screen bg-gray-100 flex'>
      {/* Sidebar */}
      <aside className='w-64 bg-white shadow-md flex flex-col'>
        <div className='p-6 border-b'>
          <h1 className='text-xl font-bold text-blue-600'>ADSO Interview</h1>
        </div>
        <nav className='flex-1 p-4 flex flex-col gap-1'>
          <a href='/dashboard' className='flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold'>
            <span>📊</span> Dashboard
          </a>
          <a href='/dashboard/podcasts' className='flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium'>
            <span>🎙️</span> My Podcasts
          </a>
          <a href='/dashboard/episodes' className='flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium'>
            <span>🎵</span> Episodes
          </a>
          <a href='/dashboard/profile' className='flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium'>
            <span>👤</span> Profile
          </a>
          <a href='/dashboard/settings' className='flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium'>
            <span>⚙️</span> Settings
          </a>
        </nav>
        <div className='p-4 border-t'>
          <form action={async () => { 'use server'; await signOut({ redirectTo: '/login' }) }}>
            <button type='submit' className='w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium'>
              <span>🚪</span> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-8'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h2 className='text-2xl font-bold text-gray-900'>My Dashboard</h2>
            <p className='text-gray-500 text-sm mt-1'>Welcome back, {session.user?.name || session.user?.email}</p>
          </div>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg'>
              {(session.user?.name || session.user?.email || 'U')[0].toUpperCase()}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
            <div className='flex items-center justify-between mb-2'>
              <p className='text-gray-500 text-sm font-medium'>Podcasts</p>
              <span className='text-2xl'>🎙️</span>
            </div>
            <p className='text-3xl font-bold text-gray-900'>0</p>
            <p className='text-green-500 text-xs mt-1 font-medium'>+0 this month</p>
          </div>
          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
            <div className='flex items-center justify-between mb-2'>
              <p className='text-gray-500 text-sm font-medium'>Episodes</p>
              <span className='text-2xl'>🎵</span>
            </div>
            <p className='text-3xl font-bold text-gray-900'>0</p>
            <p className='text-green-500 text-xs mt-1 font-medium'>+0 this month</p>
          </div>
          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
            <div className='flex items-center justify-between mb-2'>
              <p className='text-gray-500 text-sm font-medium'>Total Plays</p>
              <span className='text-2xl'>▶️</span>
            </div>
            <p className='text-3xl font-bold text-gray-900'>0</p>
            <p className='text-green-500 text-xs mt-1 font-medium'>+0 this month</p>
          </div>
          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
            <div className='flex items-center justify-between mb-2'>
              <p className='text-gray-500 text-sm font-medium'>Subscribers</p>
              <span className='text-2xl'>👥</span>
            </div>
            <p className='text-3xl font-bold text-gray-900'>0</p>
            <p className='text-green-500 text-xs mt-1 font-medium'>+0 this month</p>
          </div>
        </div>

        {/* Recent Podcasts + Chart */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='font-bold text-gray-900'>Recent Podcasts</h3>
              <a href='/dashboard/podcasts' className='text-blue-600 text-sm hover:underline'>View all</a>
            </div>
            <div className='flex flex-col items-center justify-center py-10 text-center'>
              <span className='text-5xl mb-3'>🎙️</span>
              <p className='text-gray-500 text-sm'>No podcasts yet</p>
              <a href='/dashboard/podcasts/new' className='mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700'>+ Create Podcast</a>
            </div>
          </div>

          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
            <h3 className='font-bold text-gray-900 mb-4'>Activity Overview</h3>
            <div className='flex items-end gap-2 h-32'>
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day) => (
                <div key={day} className='flex-1 flex flex-col items-center gap-1'>
                  <div className='w-full bg-blue-100 rounded-t-md' style={{height: '8px'}}></div>
                  <span className='text-xs text-gray-400'>{day}</span>
                </div>
              ))}
            </div>
            <p className='text-center text-gray-400 text-sm mt-4'>No activity yet</p>
          </div>
        </div>
      </main>
    </div>
  )
}
""")
print('Done')
