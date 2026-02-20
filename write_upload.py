with open('app/api/upload/route.ts', 'w', encoding='utf-8') as f:
    f.write("""import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import cloudinary from '@/lib/cloudinary'

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'adso-interview',
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    return NextResponse.json({ url: (result as any).secure_url }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 })
  }
}
""")
print('Done')
