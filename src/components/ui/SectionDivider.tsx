interface SectionDividerProps {
  opacity?: number;
}

const SectionDivider = ({ opacity = 35 }: SectionDividerProps) => {
  return (
    <div className="relative h-px bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent" style={{transform: 'translateZ(0)', contain: 'layout'}} />
  );
};

export default SectionDivider;