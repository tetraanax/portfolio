/* 포트폴리오 궤도 내비게이션 — 휠 한 번에 한 섹션, 섹션 사이는 궤도를 따라 줌아웃→이동→줌인
   매 프레임 바뀌는 값(카메라·현재 점·진행선)은 DOM을 직접 고치고,
   React 상태는 섹션이 바뀌거나 화면 모드·궤도 모양이 바뀔 때만 갱신 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ROUTE_DATA from '@/data/route-data.js';

const W = 1120, GUT = 72, PAD = 56;
const MOVE_DUR = 1500;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const IDLE = { go() {}, paint() {} };

export default function useOrbitNav() {
  const topRef = useRef(null), pinRef = useRef(null), worldRef = useRef(null), colRef = useRef(null), nowRef = useRef(null), progRef = useRef(null);
  const api = useRef(IDLE);
  const [secNow, setSecNow] = useState(0);
  const [isFlat, setIsFlat] = useState(false);
  const [geom, setGeom] = useState(null);

  useEffect(() => {
    const pin = pinRef.current, top = topRef.current, world = worldRef.current, col = colRef.current;
    const secEls = [...col.querySelectorAll('.sec')], N = secEls.length;
    const mqMotion = matchMedia('(prefers-reduced-motion: reduce)'), mqFlat = matchMedia('(max-width: 760px)');
    // 궤도 데이터는 src/data/route-data.js (tools/build-route.mjs가 생성)
    const ROUTE = ROUTE_DATA.route, STOP_AT = ROUTE_DATA.stops;
    const SIDE = ROUTE_DATA.side || [];  // 섹션별 배치 방향 고정: 1 = 진행 방향 오른쪽, -1 = 왼쪽, 0/생략 = 자동(번갈아)

    let flat = false, s = 1, w = 0, h = 0;
    let SEC = [], PTS = [], OFFS = [], LUT = [], LLUT = [], lineLen = 0, STOPS = [], routeLen = 0;
    let P = 0, Z = 1, BASE = 1, cur = 0, anim = null, lastKey = '', raf = 0, alive = true;

    function measure() {
      pin.style.top = top.offsetHeight + 'px';
      w = pin.clientWidth; h = pin.clientHeight;
      s = Math.min(1.35, (w - 60) / (W + 130), h / 820);
    }

    function layout() {
      col.classList.remove('placed');
      secEls.forEach(el => { el.style.left = el.style.top = ''; });
      if (flat) return;
      const H = secEls.map(el => el.offsetHeight);
      col.classList.add('placed');
      // 궤도선 근처 점들(섹션이 선을 덮는지 검사용)
      const hits = (cx, cy, hw, hh) => { let n = 0; for (let k = 0; k < ROUTE.length; k += 2) { const p = ROUTE[k]; if (Math.abs(p[0] - cx) < hw && Math.abs(p[1] - cy) < hh) n++; } return n; };
      SEC = [];
      secEls.forEach((el, i) => {
        const k = STOP_AT[i], p = ROUTE[k], q0 = ROUTE[Math.max(0, k - 6)], q1 = ROUTE[Math.min(ROUTE.length - 1, k + 6)];
        let tx = q1[0] - q0[0], ty = q1[1] - q0[1]; const tl = Math.hypot(tx, ty) || 1; tx /= tl; ty /= tl;
        // 궤도의 양옆 중 선과 덜 겹치는 쪽에 섹션을 붙임. 선과 섹션 가장자리 사이는 GUT만큼 띄움
        // 진행 방향 기준 왼쪽/오른쪽을 번갈아 배치. 그쪽이 선이나 다른 섹션과 겹치면 반대쪽으로
        const pref = SIDE[i] || (i % 2 ? 1 : -1);
        const opts = [pref, -pref].map(sgn => {
          const nx = -ty * sgn, ny = tx * sgn, half = Math.abs(nx) * W / 2 + Math.abs(ny) * H[i] / 2, dd = half + GUT + 20;
          const cx = p[0] + nx * dd, cy = p[1] + ny * dd;
          let n = hits(cx, cy, W / 2 + 40, H[i] / 2 + 40);
          SEC.forEach(o => { if (Math.abs(o.cx - cx) < W + 200 && Math.abs(o.cy - cy) < (o.h + H[i]) / 2 + 200) n += 1000; });
          return { n, cx, cy };
        });
        const best = opts[0].n <= 2 ? opts[0] : (opts[1].n < opts[0].n ? opts[1] : opts[0]);
        const x = best.cx - W / 2, t = best.cy - H[i] / 2;
        el.style.left = x + 'px'; el.style.top = t + 'px';
        const fit = Math.min(s, h / (H[i] + PAD * 2), (w - 60) / (W + 130));
        SEC.push({ x, top: t, h: H[i], cx: best.cx, cy: best.cy, k, ox: best.cx - p[0], oy: best.cy - p[1], sc: fit });
      });
      // 시점 = 궤도점 + (섹션 쪽으로 밀어낸 거리). 정지 지점 사이에선 그 거리를 부드럽게 바꿔감
      OFFS = []; PTS = [];
      const sm = x => x * x * (3 - 2 * x);
      for (let k = 0; k < ROUTE.length; k++) {
        let j = 0; while (j < N - 1 && SEC[j + 1].k <= k) j++;
        const A = SEC[j], B = SEC[Math.min(N - 1, j + 1)];
        const f = B === A ? 0 : sm(Math.min(1, (k - A.k) / Math.max(1, B.k - A.k)));
        const o = [A.ox + (B.ox - A.ox) * f, A.oy + (B.oy - A.oy) * f];
        OFFS.push(o); PTS.push([ROUTE[k][0] + o[0], ROUTE[k][1] + o[1]]);
      }
      LUT = [0];
      for (let k = 1; k < PTS.length; k++) LUT.push(LUT[k - 1] + Math.hypot(PTS[k][0] - PTS[k - 1][0], PTS[k][1] - PTS[k - 1][1]));
      routeLen = LUT[LUT.length - 1];
      STOPS = SEC.map(S => ({ idx: S.k, sc: S.sc, P: LUT[S.k] }));
      // 진행선은 궤도선 길이로 채움
      LLUT = [0];
      for (let k = 1; k < ROUTE.length; k++) LLUT.push(LLUT[k - 1] + Math.hypot(ROUTE[k][0] - ROUTE[k - 1][0], ROUTE[k][1] - ROUTE[k - 1][1]));
      lineLen = LLUT[LLUT.length - 1];
      // 궤도선·라벨·격자는 Route 컴포넌트가 그림. 도화지는 궤도·섹션 바깥으로 3000씩 여유
      const xs = ROUTE.map(p => p[0]).concat(SEC.map(S => S.x), SEC.map(S => S.x + W)), ys = ROUTE.map(p => p[1]).concat(SEC.map(S => S.top), SEC.map(S => S.top + S.h));
      const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
      const f0 = ROUTE[0];
      setGeom({
        box: [minX - 3000, minY - 3000, maxX - minX + 6000, maxY - minY + 6000], minY, maxY, lineLen,
        d: 'M' + ROUTE.map(p => `${p[0]} ${p[1]}`).join(' L'),
        lead: `M${f0[0]} ${f0[1] - 900} L${f0[0]} ${f0[1]}`,
        marks: SEC.map(S => ({ x: S.x + 8, y: S.top - 26, node: ROUTE[S.k] })),
      });
    }

    function at(p) {
      p = clamp(p, 0, routeLen);
      let lo = 0, hi = LUT.length - 1;
      while (hi - lo > 1) { const m = (lo + hi) >> 1; if (LUT[m] < p) lo = m; else hi = m; }
      const r = (p - LUT[lo]) / Math.max(1e-6, LUT[hi] - LUT[lo]);
      const mix = (A, B) => [A[0] + (B[0] - A[0]) * r, A[1] + (B[1] - A[1]) * r];
      return { cam: mix(PTS[lo], PTS[hi]), dot: mix(ROUTE[lo], ROUTE[hi]), off: mix(OFFS[lo], OFFS[hi]), done: LLUT[lo] + (LLUT[hi] - LLUT[lo]) * r };
    }

    function render() {
      if (flat) return;
      const A = at(P), [cx, cy] = A.cam, se = BASE * Z;
      const key = `${w},${h},${se.toFixed(5)},${cx.toFixed(2)},${cy.toFixed(2)}`;
      if (key === lastKey) return;
      lastKey = key;
      // 줌아웃 중엔 궤도 위 현재 점이 화면 가운데로 오도록 기준점을 옮김
      const kk = anim && anim.zmin < 1 ? (1 - Z) / (1 - anim.zmin) : 0;
      const ax = w / 2 + A.off[0] * se * kk, ay = h / 2 + A.off[1] * se * kk;
      world.style.transform = `translate(${ax}px,${ay}px) scale(${se}) translate(${-cx}px,${-cy}px)`;
      if (nowRef.current) nowRef.current.style.transform = `translate(${A.dot[0]}px,${A.dot[1]}px) scale(${1 / se})`;
      progRef.current?.setAttribute('stroke-dashoffset', (lineLen - A.done).toFixed(1));
      pin.style.setProperty('--gx', (70 + Math.sin(cx / 3000) * 18).toFixed(1) + '%');
      pin.style.setProperty('--gy', (10 + (P / Math.max(1, routeLen)) * 70).toFixed(1) + '%');
    }

    // 정지 지점 이동: 같은 섹션 안은 짧게 내려가고, 섹션을 넘을 땐 줌아웃 → 곡선 이동 → 줌인
    function goStop(j) {
      if (j < 0 || j >= STOPS.length || (j === cur && !anim)) return;
      const to = STOPS[j], dist = Math.abs(to.P - P);
      cur = j; setSecNow(j);
      if (mqMotion.matches) {
        world.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });
        anim = null; P = to.P; Z = 1; BASE = to.sc; lastKey = ''; render(); return;
      }
      const zmin = clamp(1 / (1 + dist / 1400), .2, .8);
      anim = { P0: P, P1: to.P, s0: BASE, s1: to.sc, t0: performance.now(), D: MOVE_DUR + Math.min(1200, dist * .06), zmin };
    }
    const step = d => { if (!anim) goStop(cur + d); };

    function tick(now) {
      if (!flat && anim) {
        const t = clamp((now - anim.t0) / anim.D, 0, 1);
        const e = ease(t);
        P = anim.P0 + (anim.P1 - anim.P0) * e;
        BASE = Math.exp(Math.log(anim.s0) + (Math.log(anim.s1) - Math.log(anim.s0)) * e);
        Z = Math.exp(Math.log(anim.zmin) * Math.sin(Math.PI * e));
        render();
        if (t >= 1) { P = anim.P1; Z = 1; BASE = anim.s1; anim = null; lastKey = ''; render(); }
      }
      raf = requestAnimationFrame(tick);
    }

    // 휠: 한 번의 휠 동작(입력이 0.2초 끊기기 전까지) = 한 칸. 이동 중 시작된 동작은 무시
    let lastWheel = 0, gesture = { acc: 0, used: true };
    function onWheel(e) {
      if (flat || e.ctrlKey) return;
      e.preventDefault();
      const now = performance.now();
      if (now - lastWheel > 200) gesture = { acc: 0, used: !!anim };
      lastWheel = now;
      if (gesture.used) return;
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? h : 1;
      gesture.acc += (Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX) * unit;
      if (Math.abs(gesture.acc) > 30) { gesture.used = true; step(gesture.acc > 0 ? 1 : -1); }
    }
    function onKey(e) {
      if (flat || e.target.closest('input, textarea')) return;
      if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(e.key) || (e.key === ' ' && !e.shiftKey)) { e.preventDefault(); step(1); }
      else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey)) { e.preventDefault(); step(-1); }
      else if (e.key === 'Home') { e.preventDefault(); goStop(0); }
      else if (e.key === 'End') { e.preventDefault(); goStop(N - 1); }
    }
    // 터치(태블릿 가로 등): 위아래 스와이프로 한 칸
    let ty = null;
    const onTouchStart = e => { ty = e.touches[0].clientY; };
    const onTouchMove = e => { if (!flat) e.preventDefault(); };
    const onTouchEnd = e => { if (flat || ty === null) return; const dy = ty - e.changedTouches[0].clientY; if (Math.abs(dy) > 40) step(dy > 0 ? 1 : -1); ty = null; };

    function applyMode() {
      const keep = cur;
      flat = mqFlat.matches;
      setIsFlat(flat);
      document.body.classList.toggle('flat', flat);
      document.body.style.overflow = flat ? '' : 'hidden';
      measure();
      if (flat) { world.style.transform = ''; layout(); return; }
      window.scrollTo(0, 0);
      layout();
      anim = null; Z = 1;
      cur = clamp(keep, 0, N - 1);
      P = STOPS[cur].P; BASE = STOPS[cur].sc; lastKey = '';
      setSecNow(cur); render();
    }

    api.current = {
      // 메뉴: 좁은 화면은 그 섹션으로 스크롤, 넓은 화면은 궤도 이동
      go(i) {
        if (flat) { secEls[i].scrollIntoView({ behavior: mqMotion.matches ? 'auto' : 'smooth' }); return; }
        goStop(i);
      },
      paint() { lastKey = ''; render(); },
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    document.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('resize', applyMode);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (alive) applyMode(); });
    applyMode();
    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('wheel', onWheel);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', applyMode);
      document.body.classList.remove('flat');
      document.body.style.overflow = '';
      api.current = IDLE;
    };
  }, []);

  // 궤도선(진행선 path)·현재 점이 새로 그려진 뒤 화면에 보이기 전에 한 번 더 칠함
  useLayoutEffect(() => { api.current.paint(); }, [geom, isFlat]);

  return {
    topRef, pinRef, worldRef, colRef, nowRef, progRef,
    cur: secNow, flat: isFlat, geom,
    go: i => api.current.go(i),
  };
}
