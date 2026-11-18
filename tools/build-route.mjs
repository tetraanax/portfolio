// 손으로 그린 궤도(tools/route-drawing.json) → 사이트용 궤도 데이터(src/data/route-data.js)
// 사용: npm run route -- [--scale 0.45] [--side "0,0,1,-1,..."]  (= node tools/build-route.mjs ...)
//
// 처리 순서
//  1. 그린 획들을 순서대로 이어 붙임
//  2. 손떨림 제거(이동평균, 반경 5점 × 4회)
//  3. 40px 간격으로 다시 찍음
//  4. 각 섹션 상자 중심에서 가장 가까운 궤도 지점을 1번부터 순서대로 찾음(앞 섹션보다 뒤쪽에서만)
//  5. 마지막 섹션(Skills) 지점 이후는 잘라냄
//  6. 시작점을 기준으로 scale 배 축소(도화지 크기 조절)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const arg = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };

const outPath = join(root, 'src/data/route-data.js');
let prev = {};
if (existsSync(outPath)) {
  const m = readFileSync(outPath, 'utf8').match(/export default\s*(\{[\s\S]*\});?\s*$/);
  if (m) prev = JSON.parse(m[1]);
}
const SCALE = arg('--scale') !== undefined ? Number(arg('--scale')) : (prev.scale ?? 0.45);
const SIDE = arg('--side') !== undefined ? arg('--side').split(',').map(Number) : (prev.side ?? []);

const drawing = JSON.parse(readFileSync(join(root, 'tools/route-drawing.json'), 'utf8'));
const strokes = drawing.strokes.map(s => s.pts.trim().split(/\s+/).map(p => p.split(',').map(Number)));
if (!strokes.length) throw new Error('route-drawing.json에 그린 선이 없어');

// 1. 이어 붙이기
let pts = [];
strokes.forEach((s, i) => { pts = pts.concat(i ? s.slice(1) : s); });

// 2. 다듬기
function smooth(P, w = 5, n = 4) {
  for (let r = 0; r < n; r++) {
    const Q = P.map((_, i) => {
      const a = Math.max(0, i - w), b = Math.min(P.length, i + w + 1);
      let x = 0, y = 0; for (let k = a; k < b; k++) { x += P[k][0]; y += P[k][1]; }
      return [x / (b - a), y / (b - a)];
    });
    Q[0] = P[0]; Q[Q.length - 1] = P[P.length - 1]; P = Q;
  }
  return P;
}
const P = smooth(pts);

// 3. 40px 간격 재샘플
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const L = [0];
for (let i = 1; i < P.length; i++) L.push(L[i - 1] + dist(P[i], P[i - 1]));
let R = [];
for (let s = 0, j = 0; s <= L[L.length - 1]; s += 40) {
  while (L[j + 1] < s) j++;
  const r = (s - L[j]) / Math.max(1e-6, L[j + 1] - L[j]);
  R.push([P[j][0] + (P[j + 1][0] - P[j][0]) * r, P[j][1] + (P[j + 1][1] - P[j][1]) * r]);
}

// 4. 섹션 → 궤도 지점
const stops = []; let start = 0;
for (const q of drawing.sections) {
  const c = [q.x + q.w / 2, q.y + q.h / 2];
  let best = start;
  for (let k = start; k < R.length; k++) if (dist(R[k], c) < dist(R[best], c)) best = k;
  stops.push(best); start = Math.min(R.length - 1, best + 20);
}

// 5. Skills 이후 잘라내기
R = R.slice(0, stops[stops.length - 1] + 1);

// 6. 축소
const [x0, y0] = R[0];
const route = R.map(([x, y]) => [Math.round((x0 + (x - x0) * SCALE) * 10) / 10, Math.round((y0 + (y - y0) * SCALE) * 10) / 10]);

const data = { scale: SCALE, side: SIDE, stops, route };
writeFileSync(outPath,
  '// 자동 생성 파일 — 직접 고치지 말고 tools/build-route.mjs로 다시 만들 것\n' +
  `// 원본: tools/route-drawing.json · scale ${SCALE} · 점 ${route.length}개(40px 간격, 축소 전 기준)\n` +
  'export default ' + JSON.stringify(data) + ';\n');
console.log(`route-data.js 생성: 점 ${route.length}개, 섹션 지점 ${stops.join(', ')}, scale ${SCALE}`);
