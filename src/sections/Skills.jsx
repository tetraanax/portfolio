import { CaseHead, Foot } from '@/components/CaseParts.jsx';

const STACK = [
  ['Markup', ['HTML5', '웹표준', '웹접근성']],
  ['Style', ['CSS3', 'SCSS / Sass', '반응형 · 적응형']],
  ['Script', ['JavaScript', 'jQuery']],
  ['Framework', ['React', 'Vue']],
  ['Tool', ['Git', 'GitLab / GitHub', 'SVN', 'Figma']],
];

const DS = [
  ['Color Tokens · 2단', 'Primitive 11 scale → Semantic 토큰으로 추상화'],
  ['Typography · map 스케일', 'display~caption × level, weight. typo() 믹스인'],
  ['Components · size × theme', 'button · control · chip, Size 1–5 × 테마 조합'],
  ['Modern CSS', 'anchor-positioning · @property · clip-path · mask'],
];

export default function Skills() {
  return (
    <>
      <CaseHead no="S" title="Skills & Design System" sub="퍼블리싱 · 프론트엔드 · 디자인 시스템 설계" pills={['System']} />
      <div className="two">
        <div className="stack">
          {STACK.map(([k, chips]) => <div key={k}><span>{k}</span><div className="chips">{chips.map(c => <i key={c}>{c}</i>)}</div></div>)}
        </div>
        <div className="ds">
          <h3>Self-Built Design System</h3><span className="meta">SCSS · root 62.5% (1rem=10px) · BEM 변형(.DSN, __ 미사용)</span>
          <div className="g">{DS.map(([t, d]) => <div key={t}><b>{t}</b><p>{d}</p></div>)}</div>
        </div>
      </div>
      <Foot left="kresnik.kor@gmail.com" right="Thanks for traveling." />
    </>
  );
}
