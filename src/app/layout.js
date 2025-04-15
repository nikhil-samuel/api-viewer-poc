import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Claims API Viewer',
  description: 'Monitor claim submissions from BGLA',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-xl font-bold">Claims API Viewer</h1>
            <p className="text-sm">BGLA Integration</p>
          </div>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-100 p-4 mt-8">
          <div className="container mx-auto text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Qantev - API Viewer POC
          </div>
        </footer>
      </body>
    </html>
  )
}
