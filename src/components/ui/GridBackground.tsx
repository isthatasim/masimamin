// Subtle animated grid backdrop — used behind the hero and across sections
export default function GridBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />
      {/* Radial fade — brighter in center, fades to edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(6,182,212,0.06) 0%, transparent 70%)',
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(2,8,23,0.7) 100%)',
        }}
      />
    </div>
  );
}
