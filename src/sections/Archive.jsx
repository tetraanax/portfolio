import { CaseHead, Cont, Foot } from '@/components/CaseParts.jsx';
import { pad2 } from '@/utils/format.js';

// 초기작 16장 — 4장씩 한 줄, 섹션마다 2줄
function Tiles({ from }) {
  return (
    <div className="grid4">
      {[0, 1, 2, 3].map(k => (
        <div className="t" key={k}><img src={`images/archive-${pad2(from + k)}.jpg`} width="855" height="560" alt={`초기 작업 ${from + k}`} loading="lazy" /></div>
      ))}
    </div>
  );
}

export function Archive1() {
  return (
    <>
      <CaseHead no="+" title="Archive · Early Works" sub="2013–2016 · 공공기관 · 기업 웹 다수" pills={['Web Standard', 'Accessibility']} />
      <Tiles from={1} />
      <Tiles from={5} />
    </>
  );
}

export function Archive2() {
  return (
    <>
      <Cont no="+" title="Archive · Early Works" pg="2 / 2" />
      <Tiles from={9} />
      <Tiles from={13} />
      <Foot left="초기 커리어 · 웹표준 · 웹접근성 기반 퍼블리싱" right="16 projects" />
    </>
  );
}
