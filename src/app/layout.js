import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'API Viewer POC',
  description: 'Monitor API requests between BGLA and Qantev',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <div className="w-16 bg-navy-900 flex flex-col items-center py-6">
            {/* Logo */}
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-navy-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12H3M3 12L10 5M3 12L10 19"></path>
              </svg>
            </div>
            
            {/* Navigation Icons */}
            <nav className="flex flex-col items-center space-y-8">
              {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <div key={item} className="w-10 h-10 bg-navy-800 rounded flex items-center justify-center text-white opacity-50">
                  <div className="w-5 h-5 border-2 border-current rounded"></div>
                </div>
              ))}
            </nav>
            
            {/* Bottom Items */}
            <div className="mt-auto flex flex-col items-center space-y-4">
              <div className="w-10 h-10 bg-navy-800 rounded flex items-center justify-center text-white opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-pink-400 to-pink-600"></div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 bg-gray-50">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
