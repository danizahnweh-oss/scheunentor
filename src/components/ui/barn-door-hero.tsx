"use client"

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import './barn-door-hero.css';

export interface BarnDoorHeroProps {
  title?: string;
  tagline?: string;
  scrollHint?: string;
  /** Native scroll distance in pixels. */
  scrubDistance?: number;
  className?: string;
  style?: CSSProperties;
}

function Door({ side }: { side: 'left' | 'right' }) {
  const id = useId().replace(/:/g, '');
  return <div className={`barn-door barn-door--${side}`}><svg viewBox="0 0 500 900" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".065 .003" numOctaves="3" seed={side === 'left' ? 8 : 14}/><feColorMatrix type="saturate" values="0"/><feBlend in="SourceGraphic" mode="soft-light"/></filter>
      <linearGradient id={`${id}-wood`}><stop stopColor="#49301e"/><stop offset=".18" stopColor="#8f6843"/><stop offset=".52" stopColor="#705034"/><stop offset=".87" stopColor="#946f49"/><stop offset="1" stopColor="#3c291b"/></linearGradient>
      <linearGradient id={`${id}-iron`} x2="0" y2="1"><stop stopColor="#48453a"/><stop offset=".4" stopColor="#24261f"/><stop offset="1" stopColor="#121712"/></linearGradient>
    </defs>
    <rect width="500" height="900" fill={`url(#${id}-wood)`}/>
    <g filter={`url(#${id}-grain)`}>
      {Array.from({length:8},(_,i)=><g key={i}><rect x={i*62.5} y="0" width="62.5" height="900" fill={['#8c6741','#735031','#80603e','#966e45'][i%4]}/><path d={`M${i*62.5} 0v900`} stroke="#322417" strokeWidth="3"/><path d={`M${i*62.5+3} 0v900`} stroke="#ba9264" strokeOpacity=".35"/>{[0,1,2].map(j=><path key={j} d={`M${i*62.5+12+j*17} 0 Q${i*62.5+2+j*17} 210 ${i*62.5+15+j*17} 440 T${i*62.5+12+j*17} 900`} fill="none" stroke="#322518" strokeOpacity=".35" strokeWidth="1.5"/>)}</g>)}
      <g fill="#785431" stroke="#382719" strokeWidth="3"><path d={side==='left'?'M20 760 L444 170 L482 198 L58 788Z':'M18 198 L56 170 L480 760 L442 788Z'}/><rect x="12" y="146" width="476" height="52"/><rect x="12" y="704" width="476" height="52"/><rect x="12" y="425" width="476" height="48"/></g>
    </g>
    {[172,730].map(y=><g key={y} transform={side==='right'?`translate(500 0) scale(-1 1)`:undefined}><path d={`M0 ${y-17} H130 L160 ${y} L130 ${y+17} H0Z`} fill={`url(#${id}-iron)`} stroke="#827967" strokeWidth="1"/>{[20,66,113].map(x=><circle key={x} cx={x} cy={y} r="4" fill="#131914" stroke="#6b6957"/>)}</g>)}
    <g transform={`translate(${side==='left'?455:45} 459)`}><rect x="-13" y="-30" width="26" height="60" rx="3" fill={`url(#${id}-iron)`}/><ellipse cy="13" rx="14" ry="22" fill="none" stroke="#161b15" strokeWidth="8"/><ellipse cy="12" rx="14" ry="22" fill="none" stroke="#807461" strokeWidth="2"/></g>
    <rect x="2" y="2" width="496" height="896" fill="none" stroke="#241c13" strokeWidth="4"/>
  </svg></div>
}

export default function BarnDoorHero({title='Das Tor geht auf.',tagline='Willkommen auf der anderen Seite.',scrollHint='Scrollen zum Öffnen',scrubDistance=1800,className='',style}:BarnDoorHeroProps) {
  const section = useRef<HTMLElement>(null);
  const left=useRef<HTMLDivElement>(null),right=useRef<HTMLDivElement>(null);
  const heading=useRef<HTMLDivElement>(null),reveal=useRef<HTMLDivElement>(null),bar=useRef<HTMLDivElement>(null);
  const [reduced,setReduced]=useState(false);
  const [opened,setOpened]=useState(false);
  const distance=Number.isFinite(scrubDistance)?Math.max(400,scrubDistance):1800;
  useEffect(()=>{
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    let raf=0;
    const paint=()=>{
      raf=0;
      if(!section.current)return;
      const p=media.matches?1:Math.min(1,Math.max(0,-section.current.getBoundingClientRect().top/distance));
      if(left.current)left.current.style.transform=`rotateY(${-105*p}deg)`;
      if(right.current)right.current.style.transform=`rotateY(${105*p}deg)`;
      if(heading.current){heading.current.style.opacity=String(Math.max(0,1-p*3));heading.current.style.transform=`translateY(${-p*32}px)`;heading.current.style.visibility=p>.4?'hidden':'visible';}
      if(reveal.current)reveal.current.style.opacity=String(Math.max(0,(p-.45)/.55));
      if(bar.current)bar.current.style.transform=`scaleX(${p})`;
      setOpened(p>.98);
    };
    const schedule=()=>{if(!raf)raf=requestAnimationFrame(paint);};
    const preference=()=>{setReduced(media.matches);schedule();};
    preference();paint();
    window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);media.addEventListener('change',preference);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);media.removeEventListener('change',preference);};
  },[distance]);
  const open=()=>{if(section.current)window.scrollTo({top:window.scrollY+section.current.getBoundingClientRect().top+(reduced?0:distance),behavior:'instant'});};
  return <section id="scheunentor" ref={section} className={`barn-hero ${className}`} style={{height:reduced?'100svh':`calc(100svh + ${distance}px)`,...style}} aria-label="Ein Scheunentor öffnet sich beim Scrollen">
    <div className="barn-stage">
      <div className="barn-interior" aria-hidden="true"><div className="barn-backwall"/><div className="barn-window"/><div className="barn-light"/><div className="barn-floor"/><div className="barn-beam beam-one"/><div className="barn-beam beam-two"/><div className="hay hay-one"/><div className="hay hay-two"/></div>
      <div className="barn-reveal" ref={reveal}><span>LICHT. HOLZ. WEITE.</span><p>{tagline}</p></div>
      <div className="barn-portal" aria-hidden="true"><div className="barn-leaf" ref={left}><Door side="left"/></div><div className="barn-leaf" ref={right}><Door side="right"/></div></div>
      <div className="barn-vignette" aria-hidden="true"/>
      <header className="barn-top"><a href="#scheunentor" aria-label="Zum Anfang">LAND<span> & </span>RAUM</a><span>Ein neuer Blick beginnt hier.</span></header>
      <div className="barn-heading" ref={heading}><span>ANKOMMEN. DURCHATMEN. ENTDECKEN.</span><h1>{title}</h1><p>Manchmal beginnt etwas Großes<br/>mit einer einfachen Bewegung.</p></div>
      <div className="barn-bottom"><span>{opened?'Zum Schließen zurückscrollen':scrollHint}<span aria-hidden="true"> {opened?'↑':'↓'}</span></span><button onClick={open} disabled={opened}>{opened?'Tor geöffnet':'Tor direkt öffnen ↗'}</button></div>
      <div className="barn-progress" aria-hidden="true"><div ref={bar}/></div>
    </div>
  </section>
}
