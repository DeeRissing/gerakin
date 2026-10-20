/**
 * GERAKIN: ornamen latar header.
 * Tidak menangkap klik, tidak dibaca pembaca layar, dan tidak memindahkan navbar.
 */
function OutlineBall({ x, y, size = 33, opacity = 0.14 }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${size / 30})`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
    >
      <circle r="29" />
      <path d="M-23-18C-10-20-1-9 1 1M1 1C4 11 14 19 24 17" />
      <path d="M-9-27C1-12-1-3-11 4C-20 9-25 15-26 19" />
      <path d="M17-24C11-11 11-3 20 3C26 9 29 13 28 17" />
      <path d="M-25 15C-11 6 0 10 6 22M6 22L8 28" />
      <path d="M-11 26C-7 13 0 7 13 8C21 8 26 4 29-2" />
    </g>
  );
}

export default function NavbarVolleyballAccents() {
  return (
    <div
      className="gerakin-navbar-accents pointer-events-none absolute inset-x-0 top-0 z-0 h-19 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="h-full w-full text-sky-500"
        viewBox="0 0 1600 76"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <OutlineBall x={24} y={5} size={43} />
        <OutlineBall x={190} y={84} size={29} opacity={0.12} />
        <OutlineBall x={535} y={-17} size={27} opacity={0.105} />
        <OutlineBall x={720} y={82} size={30} opacity={0.095} />
        <OutlineBall x={880} y={-17} size={33} opacity={0.11} />
        <OutlineBall x={1130} y={83} size={32} opacity={0.105} />
        <OutlineBall x={1320} y={-17} size={26} opacity={0.11} />
        <OutlineBall x={1582} y={75} size={39} opacity={0.13} />
        <path d="M330 4C350 13 367 13 382 5" stroke="#f5b800" strokeWidth="2" opacity="0.16" fill="none" />
        <path d="M1460 72C1478 60 1497 59 1511 70" stroke="#f5b800" strokeWidth="2" opacity="0.15" fill="none" />
      </svg>
    </div>
  );
}
