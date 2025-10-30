import { FormEvent, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface JoinClubDialogProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    name: string;
    email: string;
    phone: string;
    telegram: string;
    message: string;
  };
  onFormDataChange: (data: any) => void;
  onSubmit: (e: FormEvent) => void;
  isSubmitted: boolean;
  isSubmitting: boolean;
}

const JoinClubDialog = ({
  isOpen,
  onClose,
  formData,
  onFormDataChange,
  onSubmit,
  isSubmitted,
  isSubmitting
}: JoinClubDialogProps) => {
  const navigate = useNavigate();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (!value.startsWith('7')) {
      value = '7' + value;
    }
    
    let formatted = '+7';
    if (value.length > 1) {
      formatted += ' (' + value.substring(1, 4);
    }
    if (value.length >= 5) {
      formatted += ') ' + value.substring(4, 7);
    }
    if (value.length >= 8) {
      formatted += '-' + value.substring(7, 9);
    }
    if (value.length >= 10) {
      formatted += '-' + value.substring(9, 11);
    }
    
    onFormDataChange({...formData, phone: formatted});
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1a] border-[#d4af37]/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90">
            Вступить в клуб MUSE
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Заполните форму, и мы свяжемся с вами
          </DialogDescription>
        </DialogHeader>
        {isSubmitting ? (
          <div className="text-center py-12">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-[#d4af37]/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-[#d4af37] border-r-[#d4af37] border-b-transparent border-l-transparent animate-spin"></div>
            </div>
            <p className="text-lg text-[#d4af37] font-semibold">Отправка...</p>
          </div>
        ) : isSubmitted ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/20 flex items-center justify-center mb-4 mx-auto">
              <Icon name="Check" className="w-8 h-8 text-[#d4af37]" />
            </div>
            <p className="text-lg text-white/80 mb-6">Спасибо! Ваша заявка принята.</p>
            
            <div className="bg-gradient-to-br from-[#d4af37]/10 to-[#8b7355]/10 border border-[#d4af37]/30 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Icon name="Bell" className="w-5 h-5 text-[#d4af37]" />
                <p className="text-base font-semibold text-[#d4af37]">
                  Получайте уведомления о мероприятиях
                </p>
              </div>
              <p className="text-sm text-white/70 mb-4">
                Подпишитесь на бота, чтобы первыми узнавать о новых событиях и изменениях в расписании
              </p>
              <a
                href="https://t.me/Muse_Club_bot?start=subscribe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-semibold rounded-lg transition-all transform hover:scale-105"
              >
                <Icon name="Send" className="w-5 h-5" />
                Подписаться на уведомления
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              placeholder="Имя"
              value={formData.name}
              onChange={(e) => onFormDataChange({...formData, name: e.target.value})}
              required
              className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
            />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => onFormDataChange({...formData, email: e.target.value})}
              required
              className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
            />
            <Input
              type="tel"
              placeholder="Телефон"
              value={formData.phone || '+7'}
              onChange={handlePhoneChange}
              className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
            />
            <Input
              placeholder="Telegram"
              value={formData.telegram}
              onChange={(e) => onFormDataChange({...formData, telegram: e.target.value})}
              className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
            />
            <Textarea
              placeholder="Расскажите о себе"
              value={formData.message}
              onChange={(e) => onFormDataChange({...formData, message: e.target.value})}
              className="bg-[#0a0a0a] border-[#d4af37]/20 text-white min-h-[100px]"
            />
            <div className="flex items-start gap-3 pt-2">
              <Checkbox 
                id="terms-join"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="mt-1 border-[#d4af37]/30 data-[state=checked]:bg-[#d4af37] data-[state=checked]:border-[#d4af37]"
              />
              <Label 
                htmlFor="terms-join" 
                className="text-sm text-white/70 leading-relaxed cursor-pointer"
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
              disabled={isSubmitting || !agreedToTerms}
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JoinClubDialog;