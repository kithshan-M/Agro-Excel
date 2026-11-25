/** Decorative hoop-greenhouse line drawing used in the hero. */
export function GreenhouseArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 302" fill="none" aria-hidden="true" className={className}>
      <path
        d="M20 300V180a110 110 0 0 1 110-110h270a110 110 0 0 1 110 110v120Z"
        className="fill-white/10"
      />
      {[4, 3, 2, 1, 0].map((i) => (
        <path
          key={i}
          d={`M${20 + i * 67.5} 300V180a110 110 0 0 1 220 0v120`}
          className="stroke-white"
          strokeWidth={i === 0 ? 5 : 2}
          strokeOpacity={i === 0 ? 1 : 0.5}
        />
      ))}
      <path d="M130 70h270" className="stroke-white" strokeWidth="2" strokeOpacity="0.5" />
      {[75, 130, 185].map((x) => (
        <g key={x} className="fill-sun">
          <path d={`M${x - 2} 300v-58h4v58Z`} />
          <path d={`M${x} 262c0-20 12-30 28-30 0 20-12 30-28 30Z`} />
          <path d={`M${x} 280c0-18-11-27-26-27 0 18 11 27 26 27Z`} />
        </g>
      ))}
      <path d="M0 300h520" className="stroke-white" strokeWidth="5" />
    </svg>
  );
}
