import Link from 'next/link';
import { Heart, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("normalUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b dark:border-gray-800 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-rose-500 fill-rose-500" />
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Shelter Connect</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/partners" className="hidden sm:block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Our Partners
            </Link>
            
            {mounted && user ? (
              <Link href="/user/dashboard" className="text-sm font-bold text-gray-900 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                My Dashboard
              </Link>
            ) : mounted ? (
              <Link href="/user/login" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                User Login
              </Link>
            ) : null}

            <Link href="/ngo/dashboard" className="hidden md:block text-sm font-medium text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors ml-2 border-l border-gray-200 dark:border-gray-700 pl-4">
              NGO Portal
            </Link>
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full flex items-center justify-center w-9 h-9"
              aria-label="Toggle Dark Mode"
            >
              {mounted ? (theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />) : null}
            </button>
            <Link href="/report" className="text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-full transition-colors shadow-sm">
              Report Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
