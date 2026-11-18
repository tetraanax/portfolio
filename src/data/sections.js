// 섹션 순서 = 궤도 위 정지 순서(route-data.js의 stops와 개수가 같아야 함)
// 긴 케이스는 섹션을 나누고 뒤쪽에 sub('2 / 2')를 붙임 — 메뉴는 케이스(menu) 단위로 첫 섹션에 이동
import Intro from '@/sections/Intro.jsx';
import Kwangya from '@/sections/Kwangya.jsx';
import { Etax1, Etax2 } from '@/sections/Etax.jsx';
import { Archive1, Archive2 } from '@/sections/Archive.jsx';
import { ProgramP1, ProgramP2, ProgramP3 } from '@/sections/ProgramP.jsx';
import { Dtw1, Dtw2, Dtw3 } from '@/sections/Dtw.jsx';
import Skills from '@/sections/Skills.jsx';

export const SECTIONS = [
  { menu: 'Intro', part: '', Body: Intro },
  { menu: 'KWANGYA 119', part: 'PUBLISHING', Body: Kwangya },
  { menu: 'ETAXKOREA 소개', part: 'PUBLISHING', Body: Etax1 },
  { menu: 'ETAXKOREA 소개', part: 'PUBLISHING', sub: '2 / 2', Body: Etax2 },
  { menu: 'Archive', part: 'PUBLISHING', Body: Archive1 },
  { menu: 'Archive', part: 'PUBLISHING', sub: '2 / 2', Body: Archive2 },
  { menu: '프로그램P', part: 'PLANNING', Body: ProgramP1 },
  { menu: '프로그램P', part: 'PLANNING', sub: '2 / 3', Body: ProgramP2 },
  { menu: '프로그램P', part: 'PLANNING', sub: '3 / 3', Body: ProgramP3 },
  { menu: '더존테크윌 홈페이지', part: 'PLANNING', Body: Dtw1 },
  { menu: '더존테크윌 홈페이지', part: 'PLANNING', sub: '2 / 3', Body: Dtw2 },
  { menu: '더존테크윌 홈페이지', part: 'PLANNING', sub: '3 / 3', Body: Dtw3 },
  { menu: 'Skills', part: 'SKILLS', Body: Skills },
];

export const CASES = [...new Set(SECTIONS.map(s => s.menu))];
export const CASE_OF = SECTIONS.map(s => CASES.indexOf(s.menu));
