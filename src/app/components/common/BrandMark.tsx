import ScotiaLogo from '../../../assets/scotiabank-logo.png';

interface BrandMarkProps {
  tone?: "light" | "solid";
  subtitle?: string;
  compact?: boolean;
}

export function BrandMark({ tone = "solid", subtitle = "iTRADE INVESTING", compact = false }: BrandMarkProps) {
  const isLight = tone === "light";
  const markSize = compact ? 30 : 36;

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center justify-center" style={{ width: markSize, height: markSize, borderRadius: 10, border: isLight ? "1px solid rgba(255,255,255,0.25)" : "none", background: 'transparent' }}>
        <img src={ScotiaLogo} alt="Scotiabank" style={{ width: compact ? 16 : 20, height: compact ? 16 : 20, objectFit: 'contain', display: 'block' }} />
      </div>
      <div>
        <div
          style={{
            color: isLight ? "rgba(255,255,255,0.9)" : "#1A1A1A",
            fontSize: compact ? 13 : 17,
            fontWeight: compact ? 700 : 600,
            letterSpacing: "-0.2px",
            lineHeight: 1.1,
          }}
        >
          Scotiabank
        </div>
        <div
          style={{
            color: isLight ? "rgba(255,255,255,0.6)" : "#717182",
            fontSize: compact ? 10 : 11,
            letterSpacing: compact ? "0.03em" : "0.05em",
            marginTop: 1,
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
}

export function ScotiaGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 2C7.8 2 6 3.1 6 5c0 1.4.9 2.4 2.3 3.1L13 10.2c1.2.6 1.9 1.5 1.9 2.8 0 2.2-2.1 3.5-5 3.5s-5-1.4-5-3.5h2c0 1 1.3 1.7 3 1.7s3-.7 3-1.7c0-.7-.4-1.2-1.3-1.7L6.8 9.1C5.5 8.4 4 7.1 4 5c0-2.8 2.7-4.5 6-4.5s6 1.7 6 4.5h-2c0-1.5-1.7-2.5-4-2.5z"
        fill="white"
      />
    </svg>
  );
}
