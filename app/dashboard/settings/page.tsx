import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { signOut } from '@/lib/auth'

export default async function SettingsPage() {
  const session = await auth()
  if (!session) redirect('/login')

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
          <a href='/dashboard/profile' className='flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium'><span>👤</span> Profile</a>
          <a href='/dashboard/settings' className='flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold'><span>⚙️</span> Settings</a>
        </nav>
        <div className='p-4 border-t'>
          <form action={async () => { 'use server'; await signOut({ redirectTo: '/login' }) }}>
            <button type='submit' className='w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium'>
              <span>🚪</span> Sign Out
            </button>
          </form>
        </div>
      </aside>
      <main className='flex-1 p-8'>
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900'>Settings</h2>
          <p className='text-gray-500 text-sm mt-1'>Manage your account preferences</p>
        </div>
        <div className='max-w-2xl flex flex-col gap-6'>

          {/* Account Info */}
          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
            <h3 className='font-bold text-gray-900 mb-4'>Account Information</h3>
            <div className='flex flex-col gap-3'>
              <div className='flex items-center justify-between py-3 border-b border-gray-100'>
                <div>
                  <p className='text-sm font-semibold text-gray-700'>Name</p>
                  <p className='text-sm text-gray-500'>{session.user?.name || 'Not set'}</p>
                </div>
              </div>
              <div className='flex items-center justify-between py-3 border-b border-gray-100'>
                <div>
                  <p className='text-sm font-semibold text-gray-700'>Email</p>
                  <p className='text-sm text-gray-500'>{session.user?.email}</p>
                </div>
              </div>
              <div className='flex items-center justify-between py-3'>
                <div>
                  <p className='text-sm font-semibold text-gray-700'>Account Type</p>
                  <p className='text-sm text-gray-500'>Free Plan</p>
                </div>
                <span className='bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full'>Active</span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
            <h3 className='font-bold text-gray-900 mb-4'>Notifications</h3>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-semibold text-gray-700'>Email notifications</p>
                  <p className='text-xs text-gray-400'>Receive updates about your podcasts</p>
                </div>
                <div className='w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer'>
                  <div className='w-4 h-4 bg-white rounded-full absolute right-1 top-1'></div>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-semibold text-gray-700'>New subscriber alerts</p>
                  <p className='text-xs text-gray-400'>Get notified when someone subscribes</p>
                </div>
                <div className='w-10 h-6 bg-gray-200 rounded-full relative cursor-pointer'>
                  <div className='w-4 h-4 bg-white rounded-full absolute left-1 top-1'></div>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className='bg-white rounded-xl p-6 shadow-sm border border-red-100'>
            <h3 className='font-bold text-red-600 mb-4'>Danger Zone</h3>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-gray-700'>Sign out of all devices</p>
                <p className='text-xs text-gray-400'>This will sign you out everywhere</p>
              </div>
              <form action={async () => { 'use server'; await signOut({ redirectTo: '/login' }) }}>
                <button type='submit' className='bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-100'>Sign Out</button>
              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
