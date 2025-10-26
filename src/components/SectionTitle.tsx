import { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

const SectionTitle = ({ children, className = '' }: SectionTitleProps) => {
  return (
    <div className={`flex items-center gap-4 md:gap-8 mb-16 ${className}`}>
      <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]/50"></div>
      <h2 className="text-4xl md:text-5xl font-playfair text-center whitespace-nowrap">
        {children}
      </h2>
      <div className="hidden md:block flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]/50"></div>
    </div>
  );
};

export default SectionTitle;
