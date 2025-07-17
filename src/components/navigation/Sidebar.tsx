
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

interface SidebarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Sidebar = ({
  isMenuOpen,
  toggleMenu
}: SidebarProps) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Default to dark mode
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-[120px] bg-background text-foreground z-30 hidden md:block" role="complementary" aria-label="Sidebar navigation">
      <div className="h-full flex flex-col items-center">
        <div className="mt-6">
          <Link 
            to="/" 
            className="dark:text-[#5CC6D0] dark:hover:text-white text-black hover:text-[#5CC6D0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CC6D0] focus-visible:rounded-sm focus-visible:ring-offset-2"
          >
            <div className="text-center">
              <div className="text-small font-sans">Jamie</div>
              <div className="text-small font-sans">Marsland</div>
            </div>
          </Link>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <button 
            onClick={toggleMenu} 
            className="dark:text-[#5CC6D0] dark:hover:text-white text-black hover:text-[#5CC6D0] transition-colors flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CC6D0] focus-visible:rounded-sm focus-visible:ring-offset-2" 
            aria-expanded={isMenuOpen} 
            aria-controls="main-menu" 
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-8 h-8" aria-hidden="true" />
            ) : (
              <>
                <span className="block text-sm mb-2">MENU</span>
                <Menu className="w-8 h-8" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
        <div className="absolute bottom-8">
          <button
            onClick={toggleTheme}
            className="dark:text-[#5CC6D0] dark:hover:text-white text-black hover:text-[#5CC6D0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CC6D0] focus-visible:rounded-sm focus-visible:ring-offset-2"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
