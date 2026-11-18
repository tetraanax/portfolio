# Web that moves — 포트폴리오 사이트

Vite + React 19. 처음 한 번 `npm install`.

- 개발 서버: `npm run dev` → http://localhost:3070
- 배포: `main`에 푸시하면 GitHub Actions가 빌드해 GitHub Pages에 올림 → https://tetraanax.github.io/portfolio/
- 배포용 빌드: `npm run build` → `dist/` (웹서버에 올려야 열림 — `index.html` 더블클릭으로는 안 됨. 로컬 확인은 `npm run preview`)
- 마우스 휠 / 방향키: 섹션 이동
- 궤도 다시 그리기: `tools/route-board.html` → 내보내기 → `tools/route-drawing.json` 덮어쓰기 → `npm run route`
- 작업 맥락·결정 사항·다음 할 일: `CLAUDE.md` (로컬 전용 — 저장소에 안 올림)
- 포트폴리오 원본 PDF: `source/` (로컬 전용 — 저장소에 안 올림)
