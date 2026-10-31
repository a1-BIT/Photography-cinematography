"use client";
import { useEffect, useRef, useState } from "react";
import { categories, works, site, type Category, type Work } from "@/lib/content";
import { imageUrl, videoUrl } from "@/lib/media";
import { Photo } from "./Photo";
import { Arrow, Play } from "./Icon";

function Lightbox({ work, previous, next, close, count }: { work: Work; previous: () => void; next: () => void; close: () => void; count: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    const focused = document.activeElement as HTMLElement | null;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element?.showModal();
    return () => { element?.close(); document.body.style.overflow = original; focused?.focus(); };
  }, []);
  return <dialog ref={dialog} className="lightbox" aria-label={work.title} onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }} onKeyDown={event => { if ((event.target as HTMLElement).tagName === "VIDEO") return; if (event.key === "ArrowLeft") { event.preventDefault(); previous(); } if (event.key === "ArrowRight") { event.preventDefault(); next(); } }}>
    <div className="lightbox-top"><span>{site.name.toUpperCase()} / {work.category}</span><button onClick={close} autoFocus aria-label="Close fullscreen viewer">Close <span aria-hidden="true">×</span></button></div>
    <div className="lightbox-media" key={work.id}>{work.kind === "video" && work.video ? <video controls playsInline preload="metadata" poster={imageUrl(work.image)} src={videoUrl(work.video)} aria-label={site.demo ? `${work.title} — sample nature footage` : work.title} /> : <Photo source={work.image} alt={work.alt} priority />}</div>
    <div className="lightbox-bottom"><div><h3>{work.title}</h3><p>{work.kind === "video" && site.demo ? "Demo film · sample nature footage" : `${work.category} · ${work.year}`}</p></div><div className="lightbox-controls"><button onClick={previous} aria-label="Previous work">←</button><span aria-live="polite">{count}</span><button onClick={next} aria-label="Next work">→</button></div></div>
  </dialog>;
}
export function Gallery() {
  const [category, setCategory] = useState<Category | "All work">("All work");
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const filtered = category === "All work" ? works : works.filter(work => work.category === category);
  const visible = category === "All work" && !expanded ? filtered.slice(0, 6) : filtered;
  return <>
    <div className="gallery-filters" role="group" aria-label="Filter portfolio by category">{(["All work", ...categories] as const).map(item => <button key={item} aria-pressed={category === item} onClick={() => { setCategory(item); setExpanded(false); }} className={category === item ? "filter active" : "filter"}>{item}{item === "All work" && <sup>{works.length.toString().padStart(2, "0")}</sup>}</button>)}<span className="gallery-hint">A few things I’ve seen & felt</span></div>
    <p className="sr-only" aria-live="polite">Showing {visible.length} works in {category}</p>
    <div className="gallery-grid">{visible.map((work, index) => <button key={work.id} className={`work-card work-${index % 6}`} onClick={() => setSelected(index)} aria-label={`Open ${work.title}, ${work.category}, ${work.kind}`}><div className="work-image"><Photo source={work.image} alt={work.alt} sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 60vw" /><span className="media-badge">{work.kind === "video" ? <><Play /> FILM</> : "PHOTOGRAPHY"}</span><span className="work-open" aria-hidden="true"><Arrow diagonal /></span>{work.kind === "video" && <span className="play-center"><Play /></span>}</div><div className="work-caption"><h3>{work.title}</h3><span>{work.category} <span className="caption-divider">/</span> {work.year}</span></div></button>)}</div>
    {category === "All work" && <div className="gallery-more"><span>{expanded ? "A little more of my world." : "Different stories. The same considered eye."}</span><button className="text-link" onClick={() => setExpanded(!expanded)}>{expanded ? "Show less" : "Explore all work"} <span aria-hidden="true">{expanded ? "−" : "+"}</span></button></div>}
    {selected !== null && visible[selected] && <Lightbox work={visible[selected]} close={() => setSelected(null)} previous={() => setSelected((selected + visible.length - 1) % visible.length)} next={() => setSelected((selected + 1) % visible.length)} count={`${selected + 1} / ${visible.length}`} />}
  </>;
}
