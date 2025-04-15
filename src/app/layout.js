import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Claims Queue - API Viewer',
  description: 'View API requests for claim submissions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <div className="w-[86px] bg-[#001637] flex flex-col items-center">
            <div className="mt-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#001637]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <div className="flex-1 flex flex-col space-y-6">
              {/* Navigation icons - simplified for the POC */}
              {[1, 2, 3, 4, 5, 6, 7].map(item => (
                <div key={item} className="w-10 h-10 bg-[#001637] hover:bg-[#122a4e] flex items-center justify-center rounded">
                  <div className="w-6 h-6 bg-white/20 rounded"></div>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                <img 
                  src="https://i.pravatar.cc/40?img=12" 
                  alt="User avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 bg-gray-100">
            <main className="container mx-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
