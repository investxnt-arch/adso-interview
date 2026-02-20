with open('app/dashboard/profile/page.tsx', 'w', encoding='utf-8') as f:
    f.write("""import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const session = await auth()
  if (!session) redirect('/login')

  const user = session.user

  return (
    <div className='min-h-screen bg-gray-100 flex'>
      <aside className='w-64 bg-white shadow-md flex flex-col'>
        <div className='p-6 border-b'>
          <h1 className='text-xl font-bold text-blue-600'>ADSO Interview</h1>
        </div>
        <nav className='flex-1 p-4 flex flex-col gap-1'>
          <a href='/dashboard' className='flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium'><span>📊</span> Dashboard</a>
          <a href='/dashboard/podcasts' className='flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium'><span>🎙️</span> My Podcasts</a>
          <a href='/dashboard/episodes' className='flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium'><span>🎵</span> Episodes</a>
          <a href='/dashboard/profile' className='flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold'><span>👤</span> Profile</a>
          <a href='/dashboard/settings' className='flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium'><span>⚙️</span> Settings</a>
        </nav>
      </aside>
      <main className='flex-1 p-8'>
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900'>My Profile</h2>
          <p className='text-gray-500 text-sm mt-1'>Your personal information</p>
        </div>
        <div className='max-w-2xl flex flex-col gap-6'>
          <div className='bg-white rounded-xl p-8 shadow-sm border border-gray-100'>
            <div className='flex items-center gap-6 mb-8'>
              <div className='w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-4xl shadow'>
                {(user?.name || user?.email || 'U')[0].toUpperCase()}
              </div>
              <div>
                <h3 className='text-xl font-bold text-gray-900'>{user?.name || 'No name'}</h3>
                <p className='text-gray-500'>{user?.email}</p>
                <span className='mt-1 inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full'>User</span>
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <label className='text-sm font-semibold text-gray-700'>Full Name</label>
                <div className='border border-gray-200 rounded-lg px-4 py-3 text-gray-900 bg-gray-50'>{user?.name || 'Not set'}</div>
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-sm font-semibold text-gray-700'>Email</label>
                <div className='border border-gray-200 rounded-lg px-4 py-3 text-gray-900 bg-gray-50'>{user?.email}</div>
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-sm font-semibold text-gray-700'>Member Since</label>
                <div className='border border-gray-200 rounded-lg px-4 py-3 text-gray-900 bg-gray-50'>February 2026</div>
              </div>
            </div>
          </div>
          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
            <h3 className='font-bold text-gray-900 mb-4'>Account Stats</h3>
            <div className='grid grid-cols-3 gap-4'>
              <div className='text-center p-4 bg-blue-50 rounded-xl'>
                <p className='text-2xl font-bold text-blue-600'>0</p>
                <p className='text-xs text-gray-500 mt-1'>Podcasts</p>
              </div>
              <div className='text-center p-4 bg-green-50 rounded-xl'>
                <p className='text-2xl font-bold text-green-600'>0</p>
                <p className='text-xs text-gray-500 mt-1'>Episodes</p>
              </div>
              <div className='text-center p-4 bg-purple-50 rounded-xl'>
                <p className='text-2xl font-bold text-purple-600'>0</p>
                <p className='text-xs text-gray-500 mt-1'>Total Plays</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
""")
print('Done')
