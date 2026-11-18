// 케이스 공통 조각 — 머리(번호·제목·서브·필), 나뉜 뒤쪽 섹션의 이어짐 머리, 하단 줄
export function CaseHead({ no, title, sub, pills }) {
  return (
    <div className="head">
      <div className="no">{no}</div>
      <div><h2>{title}</h2><div className="sub">{sub}</div></div>
      <div className="pills">{pills.map(p => <span key={p} className={p === 'LIVE' ? 'pill live' : 'pill'}>{p}</span>)}</div>
    </div>
  );
}

export function Cont({ no, title, pg }) {
  return <div className="cont"><span><b>{no}</b>{title}</span><span className="pg">{pg}</span></div>;
}

export function Foot({ left, right }) {
  return <div className="foot"><span>{left}</span><span>{right}</span></div>;
}
