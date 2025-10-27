interface SectionDividerProps {
  opacity?: number;
}

const SectionDivider = ({ opacity = 35 }: SectionDividerProps) => {
  return (
    <div className="relative h-px">
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent"
        style={{
          backgroundImage: `linear-gradient(to right, transparent, rgba(212, 175, 55, ${opacity / 100}), transparent)`,
        }}
      />
      <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none" />
    </div>
  );
};

export default SectionDivider;
