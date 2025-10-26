import { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

const SectionTitle = ({ children, className = '' }: SectionTitleProps) => {
  return (
    <div className={`flex items-center justify-center mb-16 ${className}`}>
      <h2 className="text-4xl md:text-5xl font-playfair text-center">
        {children}
      </h2>
    </div>
  );
};

export default SectionTitle;