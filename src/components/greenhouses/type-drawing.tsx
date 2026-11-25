import type { GreenhouseKind } from "@/data/greenhouses";

const fill = "fill-leaf/10";

function spaced(count: number, gap: number) {
  return Array.from({ length: count }, (_, i) => i * gap);
}

const drawings: Record<GreenhouseKind, React.ReactNode> = {
  tunnel: (
    <>
      <path
        d="M40 146V90a50 50 0 0 1 50-50h140a50 50 0 0 1 50 50v56Z"
        className={fill}
      />
      {[180, 135, 90].map((x) => (
        <path
          key={x}
          d={`M${x} 146V90a50 50 0 0 1 100 0v56`}
          strokeOpacity="0.4"
        />
      ))}
      <path d="M40 146V90a50 50 0 0 1 100 0v56" strokeWidth="4" />
      <path d="M72 146v-42h36v42" />
    </>
  ),
  "multi-span": (
    <>
      {spaced(3, 92).map((x) => (
        <g key={x} transform={`translate(${x + 22} 0)`}>
          <path
            d="M0 146V84a46 38 0 0 1 92 0v62Z"
            className={fill}
            strokeWidth="4"
          />
          <path d="M46 46v100M0 84h92" strokeOpacity="0.4" />
        </g>
      ))}
    </>
  ),
  "net-house": (
    <>
      <path d="M36 146V50h248v96Z" className={fill} strokeWidth="4" />
      <g strokeWidth="1" strokeOpacity="0.4">
        {spaced(20, 12.4).map((x) => (
          <path key={`v${x}`} d={`M${36 + x} 50v96`} />
        ))}
        {spaced(8, 12).map((y) => (
          <path key={`h${y}`} d={`M36 ${50 + y}h248`} />
        ))}
      </g>
      <path d="M119 50v96M201 50v96" strokeWidth="3" />
    </>
  ),
  "rain-shelter": (
    <>
      <path
        d="M24 78 160 28l136 50Z"
        className={fill}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M44 78v68M276 78v68" strokeWidth="4" />
      {[82, 121, 160, 199, 238].map((x) => (
        <path
          key={x}
          d={`M${x} 146v-24M${x} 134c-12 0-16-6-16-14 10 0 16 5 16 14Zm0-4c12 0 16-6 16-14-10 0-16 5-16 14Z`}
          className="fill-sun"
          strokeWidth="1.5"
        />
      ))}
    </>
  ),
};

/** Simple line drawing for each greenhouse type. Decorative only. */
export function TypeDrawing({ kind }: { kind: GreenhouseKind }) {
  return (
    <svg
      viewBox="0 20 320 129"
      fill="none"
      strokeWidth="2"
      aria-hidden="true"
      className="block w-full stroke-leaf"
    >
      {drawings[kind]}
      <path d="M8 146h304" strokeWidth="4" />
    </svg>
  );
}
