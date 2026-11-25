/** Farm outline in the footer colour, sitting on the end of the page above it. */
export function FooterSkyline() {
  return (
    <svg
      viewBox="0 0 1600 90"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-full -mb-px block h-10 w-full fill-leaf-dark sm:h-14 lg:h-[4.5rem]"
    >
      <path d="M0 90V74Q200 58 400 72T800 70T1200 72T1600 66V90Z" />
      {/* Tunnel greenhouse */}
      <g className="fill-none stroke-leaf-dark">
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M${262 + i * 27} 78V54a25 25 0 0 1 50 0v24`}
            strokeWidth={i === 0 ? 4 : 2.4}
          />
        ))}
        <path d="M287 29h108M262 55h158M262 77h158" strokeWidth="2.4" />
      </g>
      {/* House */}
      <path d="M560 76V52h-9l17-19h52l17 19h-9v24Z" />
      {/* Water tank */}
      <path d="M1046 76V46h5v30h22V46h5v30h-4V50h-24v26Zm-4-31V24q0-8 8-8h24q8 0 8 8v21Z" />
      {/* Palms */}
      {[
        [150, 0.9],
        [700, 1.05],
        [1230, 0.95],
        [1470, 1.1],
        [880, 0.7],
      ].map(([x, size]) => (
        <path
          key={x}
          transform={`translate(${x} 78) scale(${size})`}
          d="M-2 4C-1-18 2-34 6-50l4 1C6-32 4-16 4 4ZM8-50c-12-8-24-5-30 4 10-5 20-5 30-1-8 1-15 6-18 14 6-7 12-10 19-11 6 4 10 10 10 17 3-7 2-13-4-18 9-1 17 2 22 9-2-10-9-16-20-15 7-5 15-6 24-3-6-8-16-9-25-1-1-7-5-11-11-12 4 5 5 10 3 17Z"
        />
      ))}
      {/* Rows of plants */}
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={1290 + i * 20} cy={72} r={7} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <circle key={i} cx={440 + i * 18} cy={73} r={6} />
      ))}
    </svg>
  );
}
