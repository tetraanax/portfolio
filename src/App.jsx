import Header from '@/components/Header.jsx';
import Route from '@/components/Route.jsx';
import { SECTIONS } from '@/data/sections.js';
import useOrbitNav from '@/hooks/useOrbitNav.js';

export default function App() {
  const { topRef, pinRef, worldRef, colRef, nowRef, progRef, cur, flat, geom, go } = useOrbitNav();
  return (
    <>
      <Header ref={topRef} sections={SECTIONS} cur={cur} onGo={go} />
      <main className="pin" ref={pinRef}>
        <div id="world" ref={worldRef}>
          <Route geom={geom} cur={cur} sections={SECTIONS} progRef={progRef} />
          <div id="col" ref={colRef}>
            {SECTIONS.map(({ menu, sub, Body }, i) => (
              <section className="sec" key={menu + (sub ?? '')} inert={!flat && i !== cur}>
                <div className="art"><Body /></div>
              </section>
            ))}
          </div>
          {!flat && <div className="now" ref={nowRef} />}
        </div>
      </main>
    </>
  );
}
