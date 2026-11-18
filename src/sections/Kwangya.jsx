import { CaseHead, Foot } from '@/components/CaseParts.jsx';

const TECH = ['스크롤 연동 히어로 타이포 전환 애니메이션', 'feTurbulence를 통한 그래픽 생성 방식 적용', '실시간 통계·차트 사이드 UI', '반응형 대응'];

export default function Kwangya() {
  return (
    <>
      <CaseHead no="01" title="KWANGYA 119" sub="SM Entertainment · 아티스트 보호 & 팬 소통 캠페인 사이트" pills={['LIVE', 'Interaction']} />
      <div className="split">
        <div className="shot"><img src="images/kwangya-119.jpg" width="2000" height="772" alt="KWANGYA 119 메인 화면 캡처" /></div>
        <div className="side">
          <div className="role"><div className="label">Role</div><b>퍼블리싱 100% 단독</b><p>디자인 시안 수령 후 마크업 · 스타일 · 인터랙션 전 과정 단독 구현.</p></div>
          <div><div className="label">Tech Points</div><ul className="tp">{TECH.map(t => <li key={t}>{t}</li>)}</ul></div>
        </div>
      </div>
      <Foot left="주식회사 뉴버드 재직 중 작업" right="kwangya119.smtown.com" />
    </>
  );
}
