import { CaseHead, Cont, Foot } from '@/components/CaseParts.jsx';
import { pad2 } from '@/utils/format.js';

// 카드 6장 — 앞 3장은 1 / 2 섹션, 뒤 3장은 2 / 2 섹션
const CARDS = [
  { img: 'etax-01-hero.jpg', w: 1200, h: 750, alt: '히어로 섹션', title: '히어로 · 핀 텍스트 전환', desc: 'canvas 파티클을 배경 위에서 sticky 고정, 스크롤에 따라 타이틀 → 태그라인으로 모핑.' },
  { img: 'etax-02-carousel.jpg', w: 1200, h: 710, alt: '가로 카드 캐러셀', title: '가로 카드 캐러셀', desc: '세로 스크롤을 가로 이동으로 변환. 제목은 상단 고정, 카드가 순차 슬라이드.' },
  { img: 'etax-03-logo.jpg', w: 1200, h: 750, alt: '로고 리빌', title: '로고 리빌 · 플로팅', desc: '그라데이션 섹션에서 로고 스케일-인, 코너 뱃지가 부유하는 연출.' },
  { img: 'etax-04-panel.jpg', w: 1200, h: 533, alt: '패널 전환', title: '패널 전환 · 글로우', desc: 'AI 파이프라인 패널이 가로로 전환되며 각 패널에 글로우 그래픽아트가 배치.' },
  { img: 'etax-05-compare.jpg', w: 1200, h: 679, alt: '도입 전후 비교', title: '도입 전 / 후 분할 비교', desc: '대각선 분할 레이아웃에서 1·2·3 단계가 순차로 등장하는 시퀀스 애니메이션.' },
  { img: 'etax-06-review.jpg', w: 1200, h: 682, alt: '리뷰 카드', title: '리뷰 카드 가로 스크롤', desc: '후기 카드가 가로로 흐르며 하단 스크롤 진행률 인디케이터와 연동.' },
];

function Cards({ from, to }) {
  return (
    <div className="cards">
      {CARDS.slice(from, to).map((c, i) => (
        <div className="card" key={c.img}>
          <div className="img"><img src={`images/${c.img}`} width={c.w} height={c.h} alt={c.alt} /></div>
          <div className="txt"><h4><i>{pad2(from + i + 1)}</i>{c.title}</h4><p>{c.desc}</p></div>
        </div>
      ))}
    </div>
  );
}

export function Etax1() {
  return (
    <>
      <CaseHead no="02" title="ETAXKOREA · 서비스 소개" sub="더존테크윌 · 스크롤 인터랙션 랜딩 (about-etaxkorea)" pills={['LIVE', 'Interaction']} />
      <p className="intro">세로 스크롤을 <b>핀 고정 + 가로 이동</b>으로 전환하는 인터랙션 랜딩. GSAP 없이 <b>Lenis</b> 관성 스크롤 · <b>position: sticky</b> 핀 · 스크롤 진행률 인디케이터 · <b>canvas</b> 파티클을 자체 스크롤 로직으로 구현. <b>퍼블리싱 100% 단독.</b></p>
      <Cards from={0} to={3} />
    </>
  );
}

export function Etax2() {
  return (
    <>
      <Cont no="02" title="ETAXKOREA · 서비스 소개" pg="2 / 2" />
      <Cards from={3} to={6} />
      <Foot left="Role · 퍼블리싱 100% 단독 / 기획 · 디자인 협업" right="etaxkorea.net/about-etaxkorea" />
    </>
  );
}
