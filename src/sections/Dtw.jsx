import { CaseHead, Cont, Foot } from '@/components/CaseParts.jsx';

// 더존테크윌 회사 홈페이지(2026-11-02 오픈) — 기획 PDF '02 기업 홈페이지 개편'(비식별판)을 실명으로 옮기고 오픈 화면을 더함
const TECH = ['React 19 · GSAP ScrollTrigger · Lenis', 'three.js 신경망 구체 히어로', '원형 clip-path 페이지 전환', '빌드 때 경로별 본문 미리 그리기(SEO)', '자체 SCSS 디자인 시스템 · 반응형'];

// 기획 접근(IA)
const NOTES = [
  ['통합 IA', '개별로 운영되던 서비스 소개를 Company · Service · About Us 3축으로 재편해, 한 흐름에서 전체를 파악하도록 구조화.'],
  ['서비스 내러티브', '메인에서 서비스를 스크롤 순서로 배치해 중요도·관계를 전달. 타이틀 → 요약 → CTA → 목업 패턴 반복.'],
  ['브랜드 히어로', '첫 화면에서 기업 비전을 선언하는 히어로 + 그래픽 배경으로 브랜드 톤을 먼저 각인.'],
  ['구현 가능한 설계', '웹표준·웹접근성과 실제 퍼블리싱을 전제로 화면설계 — 기획이 곧 구현으로 이어지도록.'],
];

// 화면설계 포인트
const POINTS = [
  ['반복 섹션 패턴', "모든 서비스 섹션을 '타이틀 · 요약 · CTA · 목업' 같은 골격으로 설계해 인지 부담을 낮춤."],
  ['스크롤 = 우선순위', '이택스코리아 → DEEPTAX AI → 양도코리아 순서로 사업 우선순위를 화면 순서로 표현.'],
  ['디자이너 협업 기준', '목업 영역·컴포넌트·여백을 명시해 디자이너·개발자가 바로 이어받도록 산출.'],
];

export function Dtw1() {
  return (
    <>
      <CaseHead no="02" title="더존테크윌 홈페이지" sub="더존테크윌 · 회사 홈페이지 개편 — IA · 화면설계부터 퍼블리싱까지" pills={['LIVE', 'Planning', 'Interaction']} />
      <div className="split">
        <div className="shot"><img src="images/dtw-home.jpg" width="2000" height="1250" alt="더존테크윌 홈페이지 메인 화면 캡처" /></div>
        <div className="side">
          <div className="role"><div className="label">Role</div><b>기획 · 화면설계 · 퍼블리싱</b><p>메뉴트리(IA)부터 화면설계서 13개 화면까지 기획하고, 디자인 시안을 받아 React로 구현해 2026년 11월 오픈.</p></div>
          <div><div className="label">Tech Points</div><ul className="tp">{TECH.map(t => <li key={t}>{t}</li>)}</ul></div>
        </div>
      </div>
      <Foot left="Role · 기획 · 화면설계 · 퍼블리싱 100% 단독 / 디자인 협업" right="www.dztechwill.com" />
    </>
  );
}

export function Dtw2() {
  return (
    <>
      <Cont no="02" title="더존테크윌 홈페이지 · 정보구조(IA)" pg="2 / 3" />
      <p className="intro">흩어져 있던 개별 서비스 소개를 하나의 정보구조로 통합하고, 기업 브랜드와 4개 서비스(<b>이택스코리아 · DEEPTAX AI · 양도코리아 · 더존비즈스쿨</b>)를 일관된 내러티브로 재구성. 메뉴트리 설계부터 화면설계서, 퍼블리싱까지 담당.</p>
      <figure className="ia"><div className="shot"><img src="images/dtw-ia.jpg" width="2600" height="840" alt="메뉴구조 — Index 아래 Company, Service(이택스코리아·양도코리아·딥택스 AI·더존비즈스쿨), About Us(News·CI·문의·채용안내)" /></div><figcaption>FigJam 메뉴구조</figcaption></figure>
      <div className="notes">{NOTES.map(([t, d]) => <div key={t}><b>{t}</b><p>{d}</p></div>)}</div>
    </>
  );
}

export function Dtw3() {
  return (
    <>
      <Cont no="02" title="더존테크윌 홈페이지 · 화면설계" pg="3 / 3" />
      <div className="deliver">
        <figure><div className="shot"><img src="images/dtw-wf-main.jpg" width="1400" height="1244" alt="메인 화면설계서(헤더·히어로·이택스코리아 섹션)" /></div><figcaption>메인</figcaption></figure>
        <figure><div className="shot"><img src="images/dtw-wf-company.jpg" width="900" height="1835" alt="회사소개 화면설계서" /></div><figcaption>회사소개</figcaption></figure>
        <div className="pts">{POINTS.map(([t, d]) => <div key={t}><b>{t}</b><p>{d}</p></div>)}</div>
      </div>
      <Foot left="Role · 화면설계 · 퍼블리싱 100% 단독 / 메인 외 서비스·About Us 등 13개 화면" right="Figma 화면설계서" />
    </>
  );
}
