import Icon from '@/components/ui/icon';

interface StatsCardProps {
  label: string;
  value: number;
  description: string;
  icon: string;
}

const StatsCard = ({ label, value, description, icon }: StatsCardProps) => {
  return (
    <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl">
      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-3 sm:mb-4">
        <Icon name={icon} className="text-[#b8953d]/60" size={24} />
      </div>
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#b8953d]/80 via-[#8b7355]/70 to-black/60 mb-2">
        {value}+
      </div>
      <p className="text-sm sm:text-base text-white/90 font-medium">{label}</p>
      <p className="text-xs sm:text-sm text-white/60 mt-1 sm:mt-2">{description}</p>
    </div>
  );
};

export default StatsCard;