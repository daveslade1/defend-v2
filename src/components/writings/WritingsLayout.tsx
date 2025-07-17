
import { Helmet } from "react-helmet-async";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import NavigationMenu from "@/components/navigation/NavigationMenu";

interface WritingsLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  onMenuItemClick?: () => void;
}

const WritingsLayout = ({ 
  children, 
  title = "Writings - Jamie Marsland", 
  description = "My thoughts and writings on various topics",
  isMenuOpen, 
  toggleMenu,
  onMenuItemClick
}: WritingsLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      
      <MobileHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <NavigationMenu 
        isMenuOpen={isMenuOpen}
        onMenuItemClick={onMenuItemClick}
      />
      
      <div className={`transition-all duration-300 ${isMenuOpen ? 'md:ml-[420px]' : 'md:ml-[120px]'} px-4 py-8`}>
        {children}
      </div>
    </div>
  );
};

export default WritingsLayout;
