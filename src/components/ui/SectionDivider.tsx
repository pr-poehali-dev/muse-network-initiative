interface SectionDividerProps {
  opacity?: number;
}

const SectionDivider = ({ opacity = 35 }: SectionDividerProps) => {
  return (
    <div className="relative h-px bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent" />
  );
};

export default SectionDivider;