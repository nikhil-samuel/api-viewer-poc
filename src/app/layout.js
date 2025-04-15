import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Claim Queue - API Viewer',
  description: 'View claims submitted via API',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-900 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-xl font-bold">Qantev</h1>
          </div>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
