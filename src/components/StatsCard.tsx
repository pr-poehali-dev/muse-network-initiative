import Icon from '@/components/ui/icon';

interface StatsCardProps {
  label: string;
  value: number;
  description: string;
  icon: string;
}

const StatsCard = ({ label, value, description, icon }: StatsCardProps) => {
  return (
    <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-8 rounded-2xl">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-4">
        <Icon name={icon} className="text-[#b8953d]/60" size={28} />
      </div>
      <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#b8953d]/80 via-[#8b7355]/70 to-black/60 mb-2">
        {value}+
      </div>
      <p className="text-base text-white/90 font-medium">{label}</p>
      <p className="text-sm text-white/60 mt-2">{description}</p>
    </div>
  );
};

export default StatsCard;
