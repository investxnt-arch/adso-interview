with open('app/login/page.tsx', 'w', encoding='utf-8') as f:
    f.write("""import { signIn } from '@/lib/auth'

export default function LoginPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md'>
        <h1 className='text-3xl font-bold text-center mb-1 text-gray-900'>ADSO Interview</h1>
        <p className='text-center text-gray-600 mb-8 text-sm'>Sign in to your account</p>
        <form action={async (formData: FormData) => {
          'use server'
          await signIn('credentials', { email: formData.get('email'), password: formData.get('password'), redirectTo: '/dashboard' })
        }}>
          <div className='mb-4'>
            <label className='block text-sm font-semibold text-gray-800 mb-1'>Email</label>
            <input name='email' type='email' required className='w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='you@email.com' />
          </div>
          <div className='mb-6'>
            <label className='block text-sm font-semibold text-gray-800 mb-1'>Password</label>
            <input name='password' type='password' required className='w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='••••••••' />
          </div>
          <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold text-base'>Sign In</button>
        </form>
        <div className='flex items-center my-5'>
          <div className='flex-1 border-t border-gray-300'></div>
          <span className='px-3 text-sm text-gray-500 font-medium'>or continue with</span>
          <div className='flex-1 border-t border-gray-300'></div>
        </div>
        <div className='flex flex-col gap-3'>
          <form action={async () => { 'use server'; await signIn('google', { redirectTo: '/dashboard' }) }}>
            <button type='submit' className='w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 font-semibold text-gray-800'>
              <svg width='20' height='20' viewBox='0 0 48 48'><path fill='#EA4335' d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z'/><path fill='#4285F4' d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'/><path fill='#FBBC05' d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'/><path fill='#34A853' d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.93 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'/></svg>
              Sign in with Google
            </button>
          </form>
          <form action={async () => { 'use server'; await signIn('github', { redirectTo: '/dashboard' }) }}>
            <button type='submit' className='w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 font-semibold text-gray-800'>
              <svg width='20' height='20' viewBox='0 0 24 24' fill='black'><path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z'/></svg>
              Sign in with GitHub
            </button>
          </form>
        </div>
        <p className='text-center text-sm mt-6 text-gray-700'>No account? <a href='/register' className='text-blue-600 hover:underline font-semibold'>Sign Up</a></p>
      </div>
    </div>
  )
}
""")
print('Done')
