import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  titleInHeader?: boolean;
  onScrollToSection?: (section: string) => void;
}

const Header = ({ titleInHeader = false, onScrollToSection }: HeaderProps) => {
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
    { id: 'events', label: 'События', path: '/' },
    { id: 'gallery', label: 'Галерея', path: '/' },
    { id: 'calendar', label: 'Календарь', path: '/' },
  ];

  const pageLinks = [
    { label: 'Хедлайнеры', path: '/headliners' },
    { label: 'MUSE TV', path: '/muse-tv' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-[#d4af37]/30">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate('/')}
                className="w-16 h-16 flex items-center justify-center cursor-pointer group relative"
              >
                <img 
                  src="https://cdn.poehali.dev/files/ad929cbb-521a-420f-be3a-433d40c71cfe.png"
                  alt="MUSE Logo"
                  className="w-16 h-16 object-contain transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.3)) drop-shadow(0 0 12px rgba(212, 175, 55, 0.2))'
                  }}
                />
              </button>
              
              <div
                className="transition-all duration-500 overflow-hidden"
                style={{
                  maxWidth: titleInHeader ? '200px' : '0px',
                  opacity: titleInHeader ? 1 : 0,
                }}
              >
                <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 whitespace-nowrap cursor-pointer">
                  MUSE
                </h2>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-[#b8953d]/90 uppercase tracking-wider">MENU</span>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex flex-col gap-2 w-8 h-8 justify-center items-center z-50 relative"
                aria-label="Toggle menu"
              >
                <span className={`w-6 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#8b7355] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#8b7355] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </button>
            </div>
          </div>
        </div>

        <div className={`fixed left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-[#d4af37]/30 transition-all duration-500 z-40 ${isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4 pointer-events-none'}`} style={{ top: '64px', bottom: 0, height: 'calc(100vh - 64px)' }}>
          <div className="flex flex-col items-center justify-start pt-6 h-full gap-6 px-8 overflow-y-auto">
            <div className="hidden md:flex flex-wrap items-center justify-center gap-6 pb-4 border-b border-[#d4af37]/20">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className="text-sm font-semibold text-[#b8953d]/80 hover:text-[#d4af37] transition-all duration-300 uppercase tracking-wider relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#b8953d] group-hover:w-full transition-all duration-300"></span>
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

            <div className="w-full max-w-md space-y-6 md:hidden">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className="w-full text-center text-lg font-semibold text-[#b8953d]/90 hover:text-[#d4af37] transition-all duration-300 py-3 border-b border-[#d4af37]/20 uppercase tracking-wider"
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
                    className={`w-full text-center text-lg font-semibold transition-all duration-300 py-3 border-b uppercase tracking-wider ${
                      isActive ? 'text-[#d4af37] border-[#d4af37]/60' : 'text-[#b8953d]/90 hover:text-[#d4af37] border-[#d4af37]/20'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="w-full max-w-md space-y-4 mt-8">
              <Button
                onClick={() => {
                  if (location.pathname !== '/') {
                    navigate('/');
                    setTimeout(() => {
                      const element = document.getElementById('experts');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  } else {
                    const element = document.getElementById('experts');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-transparent border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black text-base font-bold py-5 transition-all duration-300"
              >
                Стать экспертом
              </Button>

              <Button
                onClick={() => {
                  if (location.pathname !== '/') {
                    navigate('/');
                    setTimeout(() => {
                      const element = document.getElementById('join');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  } else {
                    const element = document.getElementById('join');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8953d] hover:from-[#c4a137] hover:to-[#a8853d] text-black text-base font-bold py-5 shadow-2xl shadow-[#d4af37]/30"
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