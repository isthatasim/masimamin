// Subtle animated grid backdrop with breathing effect — used behind hero and across sections
export default function GridBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {/* Grid lines — subtler, larger cells */}
      <div
        className="absolute inset-0 animate-breath"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
      {/* Radial glow — brighter in center, fades to edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(6,182,212,0.12) 0%, transparent 70%)',
        }}
      />
      {/* Vignette — dark edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(13, 27, 42, 0.8) 100%)',
        }}
      />
    </div>
  );
}
