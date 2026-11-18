import { Fragment } from 'react';
import { CASES, CASE_OF } from '@/data/sections.js';
import { pad2 } from '@/utils/format.js';

// 상단: 이름 · 케이스 메뉴(PART 라벨이 바뀔 때마다 앞에 붙임) · 진행 번호
export default function Header({ ref, sections, cur, onGo }) {
  const firsts = CASES.map(name => sections.findIndex(s => s.menu === name));
  const on = CASE_OF[cur];
  return (
    <header className="top" ref={ref}>
      <div className="who"><b>이영호</b><span>Lee Youngho</span></div>
      <nav className="menu" aria-label="포트폴리오 목차">
        {firsts.map((i, ci) => {
          const { part } = sections[i];
          return (
            <Fragment key={CASES[ci]}>
              {part && part !== sections[i - 1]?.part && <span className="part">{part}</span>}
              <button type="button" className={ci === on ? 'on' : undefined} aria-current={ci === on ? 'true' : 'false'} onClick={() => onGo(i)}>{CASES[ci]}</button>
            </Fragment>
          );
        })}
      </nav>
      <span className="prog" aria-hidden="true">{`${pad2(cur + 1)} / ${pad2(sections.length)}`}</span>
    </header>
  );
}
