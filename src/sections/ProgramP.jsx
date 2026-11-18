import { CaseHead, Cont } from '@/components/CaseParts.jsx';

const STEPS = [
  ['01 현황 분석', '프로그램Y의 메뉴·기능을 전수 분석해 무엇을 왜 재배치할지 근거를 확보'],
  ['02 IA 재설계', "'세목 계산' 중심 흐름을 '고객관리' 중심으로 전환 — 고객관리를 첫 컨택포인트로"],
  ['03 구분특징', '납세자·신고서에 직관적 식별용 한 줄 문장을 부여해, 모든 관리의 중심축으로 설계'],
  ['04 컴포넌트', '기본 input/select를 넘어선 커스텀 입력 컴포넌트로 UX 증폭'],
];

const POINTS = [
  ['구분특징', '"하남 미사 건물주"처럼 한 줄로 고객을 즉시 식별 — 모든 검색·관리의 축.'],
  ['고객 중심 IA', "구분·대상·납세구분·기간 다면 필터로 세무사가 '고객'부터 진입."],
  ['구현 가능한 설계', '숫자 자동 콤마·도메인 자동완성 등, 실 구현까지 고려한 컴포넌트.'],
];

export function ProgramP1() {
  return (
    <>
      <CaseHead no="01" title="프로그램P" sub="더존테크윌 · 프로그램Y(윈도우 앱) → 웹서비스 전환 기획" pills={['Planning', 'IA · UX']} />
      <div className="two">
        <div><div className="label">Problem</div><p className="prose">프로그램Y는 세무사가 납세자와 계약해 양도·증여·상속세 신고서를 작성·관리하는 프로그램입니다. 하지만 <b>윈도우 애플리케이션이라 유지보수·확장에 한계</b>가 있고, 세무사–납세자 소통이 개별 연락에 의존해 비효율적이었습니다.</p></div>
        <div><div className="label">Impact</div><p className="prose">납세자도 무료 가입해 서류접수·상담·신고서 확인을 서비스 안에서 처리 — 기존 B2B에서 <b>B2B2C로 확장</b>하는 것이 목표입니다.</p></div>
      </div>
      <div>
        <div className="label">Approach</div>
        <div className="steps">{STEPS.map(([t, d]) => <div key={t}><b>{t}</b><span>{d}</span></div>)}</div>
      </div>
    </>
  );
}

export function ProgramP2() {
  return (
    <>
      <Cont no="01" title="프로그램P · 분석 → 설계" pg="2 / 3" />
      <div className="boards">
        <div className="card board"><img src="images/programp-analysis.jpg" width="1400" height="1309" alt="현황 분석 보드" /><div className="cap"><b>현황 분석</b><span>프로그램Y 메뉴·기능 전수 분석</span></div></div>
        <div className="card board"><img src="images/programp-ia.jpg" width="1400" height="1309" alt="IA 재설계 보드" /><div className="cap"><b>IA 재설계</b><span>고객관리 중심 · 세목별 화면 흐름 설계</span></div></div>
      </div>
    </>
  );
}

export function ProgramP3() {
  return (
    <>
      <Cont no="01" title="프로그램P · 화면설계 & 컴포넌트" pg="3 / 3" />
      <div className="deliver">
        <figure><div className="shot"><img src="images/programp-screen.jpg" width="2000" height="1803" alt="고객관리 화면설계" /></div><figcaption>메인 · 고객관리 화면</figcaption></figure>
        <figure><div className="shot"><img src="images/programp-input.jpg" width="1000" height="2414" alt="커스텀 인풋 컴포넌트" /></div><figcaption>커스텀 인풋</figcaption></figure>
        <div className="pts">{POINTS.map(([t, d]) => <div key={t}><b>{t}</b><p>{d}</p></div>)}</div>
      </div>
    </>
  );
}
