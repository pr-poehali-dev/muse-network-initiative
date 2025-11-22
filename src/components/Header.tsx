import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/OptimizedImage';

interface HeaderProps {
  titleInHeader?: boolean;
  onScrollToSection?: (section: string) => void;
  onOpenExpertDialog?: () => void;
  onOpenJoinDialog?: () => void;
  onOpenLoginDialog?: () => void;
}

const Header = ({ titleInHeader = false, onScrollToSection, onOpenExpertDialog, onOpenJoinDialog, onOpenLoginDialog }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (section: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (onScrollToSection) {
          onScrollToSection(section);
        }
      }, 100);
    } else if (onScrollToSection) {
      onScrollToSection(section);
    }
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { id: 'hero', label: 'Главная', path: '/' },
    { id: 'about', label: 'О клубе', path: '/' },
    { id: 'experts', label: 'Эксперты', path: '/' },
    { id: 'events', label: 'Форматы', path: '/' },
    { id: 'gallery', label: 'Галерея', path: '/' },
    { id: 'calendar', label: 'Календарь', path: '/' },
  ];

  const pageLinks = [
    { label: 'События', path: '/events' },
    { label: 'MUSE TV', path: '/muse-tv' },
    { label: 'Личный кабинет', path: '/dashboard' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-black/80 backdrop-blur-xl border-b border-[#d4af37]/30">
          <div className="container mx-auto px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (location.pathname === '/') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      navigate('/');
                    }
                  }}
                  className="w-16 h-16 flex items-center justify-center group relative"
                >
                  <OptimizedImage 
                    src="https://cdn.poehali.dev/files/ad929cbb-521a-420f-be3a-433d40c71cfe.png"
                    alt="MUSE Logo"
                    className="w-16 h-16 object-contain transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.3)) drop-shadow(0 4px 12px rgba(212, 175, 55, 0.2))',
                      transform: 'translateZ(0)'
                    }}
                  />
                </button>
                
                <div className="overflow-hidden">
                  <h2 
                    className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 whitespace-nowrap transition-all duration-500 ease-out"
                    style={{
                      transform: titleInHeader ? 'translateX(0) translateZ(0)' : 'translateX(-100%) translateZ(0)',
                      opacity: titleInHeader ? 1 : 0,
                    }}
                  >
                    MUSE
                  </h2>
                </div>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
                <button
                  onClick={() => navigate('/events')}
                  className="group relative overflow-hidden bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/10 backdrop-blur-sm border-2 border-[#d4af37]/40 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-500 hover:border-[#d4af37] hover:scale-105 hover:shadow-lg hover:shadow-[#d4af37]/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 via-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/30 group-hover:via-[#d4af37]/20 group-hover:to-transparent transition-all duration-500"></div>
                  <span className="relative flex items-center gap-2 whitespace-nowrap">
                    <span className="text-[#d4af37] text-lg">🎉</span>
                    <span>ФОРУМ 13.12</span>
                  </span>
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#b8953d]/90 uppercase tracking-wider">MENU</span>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex flex-col gap-2 w-8 h-8 justify-center items-center z-50 relative"
                  aria-label="Toggle menu"
                >
                  <span className={`w-6 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#8b7355] transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                  <span className={`w-6 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#8b7355] transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`bg-black/95 backdrop-blur-xl border-t border-[#d4af37]/30 transition-all duration-500 z-40 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`}>
          <div className="flex flex-col items-center justify-start py-6 gap-6 px-8 overflow-y-auto max-h-[calc(100vh-96px)]">
            <div className="hidden md:flex flex-wrap items-center justify-center gap-6 pb-4 border-b border-[#d4af37]/20">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className="text-sm font-semibold text-[#b8953d]/80 hover:text-[#d4af37] transition-all duration-400 uppercase tracking-wider relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#b8953d] group-hover:w-full transition-all duration-400"></span>
                </button>
              ))}
              {pageLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => {
                      navigate(link.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-sm font-semibold transition-all duration-300 uppercase tracking-wider relative group ${
                      isActive ? 'text-[#d4af37]' : 'text-[#b8953d]/80 hover:text-[#d4af37]'
                    }`}
                  >
                    {link.label}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#b8953d] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </button>
                );
              })}
            </div>

            <div className="w-full max-w-md space-y-4 md:hidden">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className="w-full text-center text-sm font-semibold text-[#b8953d]/90 hover:text-[#d4af37] transition-all duration-300 py-2 border-b border-[#d4af37]/20 uppercase tracking-wider"
                >
                  {item.label}
                </button>
              ))}
              {pageLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => {
                      navigate(link.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-center text-sm font-semibold transition-all duration-300 py-2 border-b uppercase tracking-wider ${
                      isActive ? 'text-[#d4af37] border-[#d4af37]/60' : 'text-[#b8953d]/90 hover:text-[#d4af37] border-[#d4af37]/20'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="w-full max-w-md space-y-3 mt-8">
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (location.pathname === '/') {
                    if (onOpenLoginDialog) {
                      onOpenLoginDialog();
                    }
                  } else {
                    navigate('/dashboard');
                  }
                }}
                className="w-full bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-semibold text-sm py-4 transition-all duration-400 rounded-md"
              >
                Личный кабинет
              </Button>

              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenExpertDialog) {
                    onOpenExpertDialog();
                  }
                }}
                className="w-full bg-transparent border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37]/10 text-sm font-normal py-4 transition-all duration-400 rounded-md"
              >
                Стать экспертом
              </Button>

              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenJoinDialog) {
                    onOpenJoinDialog();
                  }
                }}
                className="w-full bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 text-sm font-normal py-4 transition-all duration-400 rounded-md"
              >
                Вступить в клуб →
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;