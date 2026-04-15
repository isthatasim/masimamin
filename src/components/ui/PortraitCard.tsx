import { useState } from 'react';
import { motion } from 'framer-motion';
import { personal } from '../../data/content';

export default function PortraitCard() {
  const [imgError, setImgError] = useState(false);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '320px',
    aspectRatio: '1 / 1',
    margin: '0 auto',
  };

  const imgStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center top',
    borderRadius: '50%',
    border: '3px solid rgba(6,182,212,0.4)',
    boxShadow: '0 0 30px rgba(6,182,212,0.25), 0 0 60px rgba(6,182,212,0.1)',
    display: 'block',
  };

  const fallbackStyle: React.CSSProperties = {
    ...imgStyle,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 100%)',
    fontSize: '3rem',
    fontWeight: 700,
    color: '#06b6d4',
    letterSpacing: '0.05em',
    fontFamily: 'monospace',
  };

  return (
    <div style={containerStyle}>
      {/* Outer glow ring */}
      <div style={{
        position: 'absolute', inset: '-4px',
        borderRadius: '50%',
        background: 'conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)',
        opacity: 0.3,
        zIndex: 0,
        animation: 'spin 8s linear infinite',
      }} />
      <style>{'`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`'}</style>

      {/* Photo */}
      {personal.image && !imgError ? (
        <img
          src={personal.image}
          alt={personal.name}
          style={{ ...imgStyle, position: 'relative', zIndex: 1 }}
          onError={() => setImgError(true)}
        />
      ) : (
        <div style={{ ...fallbackStyle, position: 'relative', zIndex: 1 }}>
          {personal.initials || 'MAA'}
        </div>
      )}
    </div>
  );
}
