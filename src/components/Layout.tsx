import { useState, useEffect, useRef, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Header from './Header';
import OptimizedImage from '@/components/OptimizedImage';

interface LayoutProps {
  children: ReactNode;
  titleInHeader?: boolean;
  onScrollToSection?: (id: string) => void;
  onOpenExpertDialog?: () => void;
  onOpenJoinDialog?: () => void;
  onOpenLoginDialog?: () => void;
}

const Layout = ({ 
  children, 
  titleInHeader = false, 
  onScrollToSection: externalScrollToSection,
  onOpenExpertDialog: externalOpenExpertDialog,
  onOpenJoinDialog: externalOpenJoinDialog,
  onOpenLoginDialog: externalOpenLoginDialog
}: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpertDialogOpen, setIsExpertDialogOpen] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [agreedToTermsExpert, setAgreedToTermsExpert] = useState(false);
  const [agreedToTermsJoin, setAgreedToTermsJoin] = useState(false);

  const defaultScrollToSection = (id: string) => {
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
        titleInHeader={titleInHeader}
        onScrollToSection={externalScrollToSection || defaultScrollToSection}
        onOpenExpertDialog={externalOpenExpertDialog || (() => setIsExpertDialogOpen(true))}
        onOpenJoinDialog={externalOpenJoinDialog || (() => setIsJoinDialogOpen(true))}
        onOpenLoginDialog={externalOpenLoginDialog}
      />

      {children}

      <footer className="py-8 px-4 bg-black text-white relative">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <button
              onClick={() => navigate('/')}
              className="group mb-3"
            >
              <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 transition-all duration-300 group-hover:scale-105">
                MUSE
              </h2>
            </button>
            <p className="text-base mb-4">
              Вместе мы можем достичь большего
            </p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={() => navigate('/terms')}
                className="text-sm text-white/60 hover:text-[#d4af37] transition-colors underline"
              >
                Пользовательское соглашение
              </button>
            </div>
            <p className="text-xs opacity-75">
              © 2025 Клуб Muse. Все права защищены.
            </p>
          </div>
          
          <div className="flex justify-center md:justify-end">
            <a 
              href="https://albeweb.ru/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors group"
            >
              <span>Разработано в</span>
              <OptimizedImage 
                src="https://cdn.poehali.dev/files/1dabbacb-5667-4dc2-b2bb-e600cedcabfb.png" 
                alt="Albe" 
                className="h-6 opacity-50 group-hover:opacity-80 transition-opacity"
              />
            </a>
          </div>
        </div>
      </footer>

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
            <div className="flex items-start gap-3 pt-2">
              <Checkbox 
                id="terms-expert-layout"
                checked={agreedToTermsExpert}
                onCheckedChange={(checked) => setAgreedToTermsExpert(checked as boolean)}
                className="mt-1 border-[#d4af37]/30 data-[state=checked]:bg-[#d4af37] data-[state=checked]:border-[#d4af37]"
              />
              <Label 
                htmlFor="terms-expert-layout" 
                className="text-sm text-gray-400 leading-relaxed"
              >
                Я соглашаюсь с{' '}
                <button
                  type="button"
                  onClick={() => navigate('/terms')}
                  className="text-[#d4af37] hover:text-[#b8953d] underline"
                >
                  Пользовательским соглашением
                </button>
              </Label>
            </div>
            <Button 
              type="submit"
              disabled={!agreedToTermsExpert}
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8953d] hover:from-[#c4a137] hover:to-[#a8853d] text-black font-bold disabled:opacity-50"
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
            <div className="flex items-start gap-3 pt-2">
              <Checkbox 
                id="terms-join-layout"
                checked={agreedToTermsJoin}
                onCheckedChange={(checked) => setAgreedToTermsJoin(checked as boolean)}
                className="mt-1 border-[#d4af37]/30 data-[state=checked]:bg-[#d4af37] data-[state=checked]:border-[#d4af37]"
              />
              <Label 
                htmlFor="terms-join-layout" 
                className="text-sm text-gray-400 leading-relaxed"
              >
                Я соглашаюсь с{' '}
                <button
                  type="button"
                  onClick={() => navigate('/terms')}
                  className="text-[#d4af37] hover:text-[#b8953d] underline"
                >
                  Пользовательским соглашением
                </button>
              </Label>
            </div>
            <Button 
              type="submit"
              disabled={!agreedToTermsJoin}
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8953d] hover:from-[#c4a137] hover:to-[#a8853d] text-black font-bold disabled:opacity-50"
            >
              Вступить в клуб
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Layout;