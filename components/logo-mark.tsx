export function LogoMark({ className = "" }: { className?: string }) {
  return <svg className={`lz-mark ${className}`} viewBox="0 0 48 48" fill="none" aria-hidden="true"><path className="lz-frame" d="M17 3H3v14M31 3h14v14M45 31v14H31M17 45H3V31" stroke="currentColor" strokeWidth="1" /><path className="lz-letter" d="M12 12v24h10M22 12h14L23 36h13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" /><path className="lz-cross" d="M20 24h18" stroke="currentColor" strokeWidth="1" /></svg>;
}
