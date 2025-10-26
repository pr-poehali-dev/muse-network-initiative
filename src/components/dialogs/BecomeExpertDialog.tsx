import { FormEvent } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface BecomeExpertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    name: string;
    email: string;
    phone: string;
    telegram: string;
    expertise: string;
    message: string;
  };
  onFormDataChange: (data: any) => void;
  onSubmit: (e: FormEvent) => void;
  isSubmitted: boolean;
}

const BecomeExpertDialog = ({
  isOpen,
  onClose,
  formData,
  onFormDataChange,
  onSubmit,
  isSubmitted
}: BecomeExpertDialogProps) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith('+7')) {
      value = '+7' + value.replace(/^\+?7?/, '');
    }
    onFormDataChange({...formData, phone: value});
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1a] border-[#d4af37]/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90">
            Стать экспертом клуба
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Поделитесь своим опытом с участницами клуба
          </DialogDescription>
        </DialogHeader>
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/20 flex items-center justify-center mb-4 mx-auto">
              <Icon name="Check" className="w-8 h-8 text-[#d4af37]" />
            </div>
            <p className="text-lg text-white/80">Спасибо! Ваша заявка принята.</p>
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
            <Input
              placeholder="Ваша экспертиза"
              value={formData.expertise}
              onChange={(e) => onFormDataChange({...formData, expertise: e.target.value})}
              required
              className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
            />
            <Textarea
              placeholder="Расскажите о своем опыте"
              value={formData.message}
              onChange={(e) => onFormDataChange({...formData, message: e.target.value})}
              className="bg-[#0a0a0a] border-[#d4af37]/20 text-white min-h-[100px]"
            />
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold"
            >
              Отправить заявку
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BecomeExpertDialog;