import { FormEvent } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

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
}

const JoinClubDialog = ({
  isOpen,
  onClose,
  formData,
  onFormDataChange,
  onSubmit,
  isSubmitted
}: JoinClubDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1a] border-[#d4af37]/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#8b7355]">
            Вступить в клуб MUSE
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Заполните форму, и мы свяжемся с вами
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
              value={formData.phone}
              onChange={(e) => onFormDataChange({...formData, phone: e.target.value})}
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

export default JoinClubDialog;
