import { useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  titleInHeader?: boolean;
}

const Layout = ({ children, titleInHeader = false }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const [isExpertDialogOpen, setIsExpertDialogOpen] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const navHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const navHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <>
      <Header 
        titleInHeader={titleInHeader || scrollY > 100}
        onScrollToSection={scrollToSection}
        onOpenExpertDialog={() => setIsExpertDialogOpen(true)}
        onOpenJoinDialog={() => setIsJoinDialogOpen(true)}
      />

      {children}

      <Dialog open={isExpertDialogOpen} onOpenChange={setIsExpertDialogOpen}>
        <DialogContent className="bg-black/95 border-[#d4af37]/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#d4af37]">Стать экспертом MUSE</DialogTitle>
            <DialogDescription className="text-gray-400">
              Заполните форму, и мы свяжемся с вами для обсуждения деталей
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="expert-name" className="text-[#d4af37]">Имя *</Label>
              <Input 
                id="expert-name"
                placeholder="Ваше имя"
                className="bg-black/50 border-[#d4af37]/30 text-white placeholder:text-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expert-email" className="text-[#d4af37]">Email *</Label>
              <Input 
                id="expert-email"
                type="email"
                placeholder="your@email.com"
                className="bg-black/50 border-[#d4af37]/30 text-white placeholder:text-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expert-phone" className="text-[#d4af37]">Телефон</Label>
              <Input 
                id="expert-phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                className="bg-black/50 border-[#d4af37]/30 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expert-expertise" className="text-[#d4af37]">Область экспертизы *</Label>
              <Textarea 
                id="expert-expertise"
                placeholder="Расскажите о своей области знаний..."
                className="bg-black/50 border-[#d4af37]/30 text-white placeholder:text-gray-500 min-h-[100px]"
                required
              />
            </div>
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8953d] hover:from-[#c4a137] hover:to-[#a8853d] text-black font-bold"
            >
              Отправить заявку
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
        <DialogContent className="bg-black/95 border-[#d4af37]/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#d4af37]">Вступить в клуб MUSE</DialogTitle>
            <DialogDescription className="text-gray-400">
              Станьте частью уникального сообщества единомышленников
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="join-name" className="text-[#d4af37]">Имя *</Label>
              <Input 
                id="join-name"
                placeholder="Ваше имя"
                className="bg-black/50 border-[#d4af37]/30 text-white placeholder:text-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="join-email" className="text-[#d4af37]">Email *</Label>
              <Input 
                id="join-email"
                type="email"
                placeholder="your@email.com"
                className="bg-black/50 border-[#d4af37]/30 text-white placeholder:text-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="join-phone" className="text-[#d4af37]">Телефон *</Label>
              <Input 
                id="join-phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                className="bg-black/50 border-[#d4af37]/30 text-white placeholder:text-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="join-message" className="text-[#d4af37]">Сообщение</Label>
              <Textarea 
                id="join-message"
                placeholder="Расскажите немного о себе..."
                className="bg-black/50 border-[#d4af37]/30 text-white placeholder:text-gray-500 min-h-[100px]"
              />
            </div>
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8953d] hover:from-[#c4a137] hover:to-[#a8853d] text-black font-bold"
            >
              Отправить заявку
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Layout;
