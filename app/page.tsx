export default function HomePage() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Navbar */}
      <nav className='flex items-center justify-between px-8 py-4 border-b border-gray-100'>
        <h1 className='text-xl font-bold text-blue-600'>ADSO Interview</h1>
        <div className='flex items-center gap-4'>
          <a href='/login' className='text-gray-600 hover:text-gray-900 font-medium text-sm'>Sign In</a>
          <a href='/register' className='bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700'>Get Started</a>
        </div>
      </nav>

      {/* Hero */}
      <section className='flex flex-col items-center justify-center text-center px-8 py-24 bg-gradient-to-b from-blue-50 to-white'>
        <span className='bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6'>🎙️ Podcast Platform</span>
        <h2 className='text-5xl font-bold text-gray-900 mb-6 max-w-3xl leading-tight'>Create and Share Your Podcast with the World</h2>
        <p className='text-gray-500 text-lg mb-10 max-w-xl'>Upload audio and video episodes, manage your content, and grow your audience — all in one place.</p>
        <div className='flex gap-4'>
          <a href='/register' className='bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-base hover:bg-blue-700 shadow-lg'>Start for Free</a>
          <a href='/login' className='border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-bold text-base hover:bg-gray-50'>Sign In</a>
        </div>
      </section>

      {/* Features */}
      <section className='px-8 py-20 max-w-6xl mx-auto'>
        <h3 className='text-3xl font-bold text-center text-gray-900 mb-4'>Everything you need</h3>
        <p className='text-center text-gray-500 mb-14'>A complete platform to manage your podcast</p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='bg-blue-50 rounded-2xl p-8 text-center'>
            <span className='text-5xl mb-4 block'>🎙️</span>
            <h4 className='text-lg font-bold text-gray-900 mb-2'>Easy Upload</h4>
            <p className='text-gray-500 text-sm'>Upload audio and video files in seconds. Supports MP3, WAV, MP4 and more.</p>
          </div>
          <div className='bg-green-50 rounded-2xl p-8 text-center'>
            <span className='text-5xl mb-4 block'>📊</span>
            <h4 className='text-lg font-bold text-gray-900 mb-2'>Analytics Dashboard</h4>
            <p className='text-gray-500 text-sm'>Track your plays, subscribers and growth with a beautiful dashboard.</p>
          </div>
          <div className='bg-purple-50 rounded-2xl p-8 text-center'>
            <span className='text-5xl mb-4 block'>🔐</span>
            <h4 className='text-lg font-bold text-gray-900 mb-2'>Secure Login</h4>
            <p className='text-gray-500 text-sm'>Sign in with email, Google or GitHub. Your data is always safe.</p>
          </div>
          <div className='bg-yellow-50 rounded-2xl p-8 text-center'>
            <span className='text-5xl mb-4 block'>🎵</span>
            <h4 className='text-lg font-bold text-gray-900 mb-2'>Episode Management</h4>
            <p className='text-gray-500 text-sm'>Organize your episodes by podcast and keep everything in order.</p>
          </div>
          <div className='bg-red-50 rounded-2xl p-8 text-center'>
            <span className='text-5xl mb-4 block'>☁️</span>
            <h4 className='text-lg font-bold text-gray-900 mb-2'>Cloud Storage</h4>
            <p className='text-gray-500 text-sm'>All your files stored securely on Cloudinary. Fast and reliable.</p>
          </div>
          <div className='bg-indigo-50 rounded-2xl p-8 text-center'>
            <span className='text-5xl mb-4 block'>👤</span>
            <h4 className='text-lg font-bold text-gray-900 mb-2'>User Profiles</h4>
            <p className='text-gray-500 text-sm'>Manage your profile, track your stats and customize your experience.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='bg-blue-600 px-8 py-20 text-center'>
        <h3 className='text-3xl font-bold text-white mb-4'>Ready to start your podcast?</h3>
        <p className='text-blue-100 mb-8 text-lg'>Join ADSO Interview and share your voice with the world.</p>
        <a href='/register' className='bg-white text-blue-600 px-8 py-3 rounded-xl font-bold text-base hover:bg-blue-50 shadow-lg'>Get Started for Free</a>
      </section>

      {/* Footer */}
      <footer className='px-8 py-8 border-t border-gray-100 text-center text-gray-400 text-sm'>
        <p>© 2026 ADSO Interview. Built with Next.js & Cloudinary.</p>
      </footer>
    </div>
  )
}
