import { pad2 } from '@/utils/format.js';

// 도화지 점 격자 + 궤도선 + 지나온 구간(진행선) + 섹션 라벨·지점. 좌표는 useOrbitNav의 layout()이 계산해서 넘김
export default function Route({ geom, cur, sections, progRef }) {
  if (!geom) return null;
  const [bx0, by0, bw, bh] = geom.box;
  return (
    <>
      <div className="grid" style={{ left: bx0, top: by0, width: bw, height: bh }} />
      <svg className="route" width={bw} height={bh} viewBox={`${bx0} ${by0} ${bw} ${bh}`} style={{ left: bx0, top: by0 }} aria-hidden="true">
        <defs>
          <linearGradient id="rG" gradientUnits="userSpaceOnUse" x1="0" y1={geom.minY} x2="0" y2={geom.maxY}>
            <stop offset="0" stopColor="#E05BB5" /><stop offset=".5" stopColor="#A47BFF" /><stop offset="1" stopColor="#5B8CFF" />
          </linearGradient>
        </defs>
        <path d={geom.lead} fill="none" stroke="#24273A" strokeWidth="2" strokeDasharray="2 10" />
        <path d={geom.d} fill="none" stroke="#24273A" strokeWidth="2" />
        {/* 진행선 stroke-dashoffset은 useOrbitNav가 매 프레임 직접 바꿈 — 여기서 넘기면 다시 그릴 때마다 처음 값으로 돌아감 */}
        <path ref={progRef} d={geom.d} fill="none" stroke="url(#rG)" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${geom.lineLen} ${geom.lineLen}`} />
        {geom.marks.map((m, i) => {
          const { menu, part, sub } = sections[i];
          return (
            <g key={i} className={i === cur ? 'sg on' : 'sg'}>
              {part && part !== sections[i - 1]?.part && !sub && <text className="pt" x={m.x} y={m.y - 22}>{part}</text>}
              <text className="lb" x={m.x} y={m.y}>{`${pad2(i + 1)}  ${menu}${sub ? '  ·  ' + sub : ''}`}</text>
              <circle className="node" cx={m.node[0]} cy={m.node[1]} r="9" />
            </g>
          );
        })}
      </svg>
    </>
  );
}
