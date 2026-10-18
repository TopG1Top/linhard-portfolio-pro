"use client";

import { LogoMark } from "@/components/logo-mark";
import type { CSSProperties } from "react";

// An engraved, generated contour field. It depicts no captured biometric data.
const contours = Array.from({ length: 30 }, (_, strand) => {
  const radius = 12 + strand * 3.55;
  const start = strand % 4 === 0 ? .14 : .29;
  return Array.from({ length: 90 }, (_, index) => {
    const t = start + index / 89 * (Math.PI * 2 - .56 - start);
    const whorl = 1 - radius / 132;
    const x = 200 + Math.cos(t) * radius * .81 + Math.sin(t * 2) * 17 * whorl;
    const y = 191 + Math.sin(t) * radius * 1.13 + Math.cos(t * 2 + .5) * 14 * whorl;
    return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(" ");
});

export function EntryIdentityField({ progress, digest, nonce, ready }: { progress: number; digest: string; nonce: string; ready: boolean }) {
  const p = progress / 100;
  const resolved = Math.round(Math.min(1, Math.max(0, (p - .23) / .48)) * 64);
  const stage = Math.min(2, Math.floor(p * 3));
  const scan = Math.min(1, p / .69);

  return <div className={`entry-identity-field identity-field-stage-${stage}`} aria-hidden="true">
    <div className="identity-field-grid" />
    <div className="identity-field-top"><span><i />GENERATIVE IDENTITY FIELD</span><span>LZ / 001</span></div>
    <div className="identity-field-coordinate identity-field-coordinate-left"><span>CHALLENGE</span><i /><span>LOCAL / EPHEMERAL</span></div>
    <div className="identity-field-coordinate identity-field-coordinate-right"><span>SHA 256</span><i /><span>NO STORAGE</span></div>
    <svg className="entry-contours" viewBox="0 0 400 400" fill="none">
      <defs><linearGradient id="entry-contour-ink" x1="80" y1="70" x2="320" y2="310" gradientUnits="userSpaceOnUse"><stop stopColor="#8a7559" /><stop offset=".5" stopColor="#ead5ae" /><stop offset="1" stopColor="#b19269" /></linearGradient></defs>
      <g className="entry-contour-ghost">{contours.map((d, index) => <path key={index} d={d} />)}</g>
      <g className="entry-contour-engraving">{contours.map((d, index) => <path key={index} d={d} pathLength={1} style={{ strokeDashoffset: 1 - Math.min(1, Math.max(0, (p - .03 - index * .006) / .34)) }} />)}</g>
      <path className="entry-optical-axis" d="M200 45V74 M200 310V340 M65 191H94 M306 191H335" />
      <path className="entry-optical-axis entry-optical-axis-fine" d="M110 110H125V95 M290 110H275V95 M110 275H125V290 M290 275H275V290" />
    </svg>
    <div className="entry-contour-crosshair"><i /><i /></div>
    <div className="entry-optical-scan" style={{ top: `${16 + scan * 59}%` }}><i /><span>{stage === 0 ? "CAPTURING ENTROPY" : "DERIVING FINGERPRINT"}</span></div>
    <div className="entry-input-fragments">{Array.from({ length: 8 }, (_, index) => <code key={index} style={{ "--fragment-index": index } as CSSProperties}>{nonce ? nonce.slice((index % 4) * 8, (index % 4 + 1) * 8) : "········"}</code>)}</div>
    <div className="entry-proof-seal">
      <span className="entry-proof-seal-top">LOCAL HASH / {ready ? "RESOLVED" : "BASIC MODE"}</span>
      <LogoMark />
      <div className="entry-seal-rule"><i /><span>LINHARD ZEJNELI</span><i /></div>
      <code>{digest ? `${digest.slice(0, 4)} : ${digest.slice(-4)}` : "LZ : READY"}</code>
      <span className="entry-proof-seal-bottom">ONE REQUEST / ONE SIGNATURE</span>
      <i className="entry-seal-corner entry-seal-corner-a" /><i className="entry-seal-corner entry-seal-corner-b" />
    </div>
    <div className="entry-field-ledger"><span>INPUT <b>16 B</b></span><div>{Array.from({ length: 24 }, (_, index) => <i key={index} className={p > index / 24 ? "is-resolved" : ""} />)}</div><span>OUTPUT <b>32 B</b></span></div>
    <div className="entry-digest-ledger"><div><span>SESSION FINGERPRINT</span><span>{String(resolved).padStart(2, "0")} / 64 HEX</span></div><div className="entry-digest-chunks">{Array.from({ length: 8 }, (_, index) => <code key={index} className={resolved >= (index + 1) * 8 ? "is-resolved" : ""}>{digest.slice(index * 8, index * 8 + Math.max(0, Math.min(8, resolved - index * 8))).padEnd(8, "·")}</code>)}</div></div>
    <div className="identity-field-bottom"><span>{["ENTROPY / COLLECTED", "DIGEST / COMPOSED", "EXPERIENCE / READY"][stage]}</span><span>0{stage + 1} / 03</span></div>
  </div>;
}
