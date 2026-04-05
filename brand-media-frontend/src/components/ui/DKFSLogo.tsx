// components/DKFSLogo.tsx
'use client';
import '../app/globals.css';

interface DKFSLogoProps {
  size?: number;
  color?: string;
  breathe?: boolean;
  animated?: boolean;
  className?: string;
}

const C = {
    deepTeal:    "#1F3F3E",
    forestTeal:  "#183433",
    darkTeal:    "#122928",
    baseTeal:    "#2A5150",
    softTeal:    "#3E6B69",
    warmWhite:   "#F7F6F2",
    softLinen:   "#EFECE6",
    lightClay:   "#DDD8CF",
    stoneGrey:   "#CFCBC3",
    softCharcoal:"#2E2E2E",
    sand:        "#E6D7B9",
    linenBeige:  "#E8E2D6",
    softMoss:    "#7A8C7A",
    warmClay:    "#C89B7B",
    crimson:     "#A0392A",
  };

export default function DKFSLogo({
  size = 52,
  color = C.warmWhite,
  breathe = true,
  animated = false,
  className = '',
}: DKFSLogoProps) {
  const cx = 50;
  const cy = 58;
  const petalPath = 'M0,-28 C8,-28 14,-18 14,-8 C14,4 8,12 0,14 C-8,12 -14,4 -14,-8 C-14,-18 -8,-28 0,-28 Z';
  const seedR = 9;
  const dist = seedR + 3;

  const petals = [
    { angle: -48, delay: '0.25s', cls: 'petal-1' },
    { angle: -16, delay: '0.4s', cls: 'petal-2' },
    { angle: 16, delay: '0.55s', cls: 'petal-3' },
    { angle: 48, delay: '0.7s', cls: 'petal-4' },
  ];

  return (
    <div className={`flex flex-col items-center ${breathe ? 'breathe' : ''} ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          .sym-petal { transform-box: fill-box; }
          .sym-petal-1 { --r: -48deg; --ox: 50%; --oy: 100%; }
          .sym-petal-2 { --r: -16deg; --ox: 50%; --oy: 100%; }
          .sym-petal-3 { --r: 16deg; --ox: 50%; --oy: 100%; }
          .sym-petal-4 { --r: 48deg; --ox: 50%; --oy: 100%; }
          @keyframes breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.022)} }
          .breathe { animation: breathe 6s ease-in-out infinite; }
        `}</style>

        {/* Petals */}
        {petals.map((p, i) => {
          const rad = (p.angle * Math.PI) / 180;
          const tipX = cx + Math.sin(rad) * dist;
          const tipY = cy - Math.cos(rad) * dist;
          return (
            <g
              key={i}
              className={`sym-petal sym-petal-${i + 1} ${animated ? `petal ${p.cls}` : ''}`}
              style={animated ? { animationDelay: p.delay } : {}}
              transform={`translate(${tipX},${tipY}) rotate(${p.angle})`}
            >
              <path d={petalPath} fill={color} />
            </g>
          );
        })}

        {/* Center seed */}
        <circle
          cx={cx}
          cy={cy}
          r={seedR}
          fill={color}
          className={animated ? 'seed' : ''}
        />
      </svg>

      {/* Wordmark */}
      <div className="mt-1 text-center">
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: size * 0.55,
            fontWeight: 700,
            color,
            letterSpacing: '0.22em',
            lineHeight: 1,
          }}
        >
          DKFs
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: size * 0.22,
            fontStyle: 'italic',
            color: '#E6D7B9',
            opacity: 0.65,
            letterSpacing: '0.1em',
          }}
        >
          Vintage · Nature
        </div>
      </div>
    </div>
  );
}
