import type {CSSProperties} from 'react';

type ParticleStyle=CSSProperties&Record<`--${string}`,string>;
export function AmbientField() {
  return <div className="ambient-field" aria-hidden="true">{Array.from({length:22},(_,index)=>{
    const style:ParticleStyle={'--x':`${(index*43+7)%100}%`,'--y':`${(index*29+11)%100}%`,'--size':`${index%4===0?11:3+index%4}px`,'--duration':`${23+index%11}s`,'--delay':`-${index*1.7}s`,'--dx':`${index%2?38:-38}px`};
    return <span key={index} className={`ambient-particle ${index%4===0?'ambient-glint':''}`} style={style}/>;
  })}<span className="ambient-light light-a"/><span className="ambient-light light-b"/></div>;
}
