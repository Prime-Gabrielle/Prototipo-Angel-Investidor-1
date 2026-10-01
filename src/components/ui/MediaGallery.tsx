import { useState, useEffect, useCallback } from "react";
import { Play, ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import type { MediaItem } from "../../lib/types";
import "./media.css";

export default function MediaGallery({ media }: { media: MediaItem[] }) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const current = media[index];

  const go = useCallback(
    (dir: number) => {
      setIndex((i) => (i + dir + media.length) % media.length);
    },
    [media.length]
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, go]);

  if (!media.length) return null;

  return (
    <>
      <div className="gallery">
        <div className="gallery-thumbs">
          {media.map((m, i) => (
            <button
              key={m.id}
              className={`gallery-thumb ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Ver mídia ${i + 1}`}
            >
              <img src={m.thumb ?? m.url} alt={m.title ?? ""} loading="lazy" />
              {m.type === "video" && (
                <span className="play-badge"><Play size={18} fill="#fff" /></span>
              )}
            </button>
          ))}
        </div>

        <div className="gallery-main" onClick={() => current.type === "image" && setLightbox(true)}>
          <span className="gallery-tag badge" style={{ background: "#071423b3", color: "#fff" }}>
            {current.type === "video" ? "Vídeo" : "Foto"}
          </span>

          {current.type === "video" ? (
            <video src={current.url} poster={current.thumb} controls playsInline>
              Seu navegador não suporta vídeo.
            </video>
          ) : (
            <>
              <img src={current.url} alt={current.title ?? "Foto da empresa"} />
              <button
                className="gallery-nav next"
                style={{ right: 12, top: 12, transform: "none", width: 36, height: 36 }}
                onClick={(e) => { e.stopPropagation(); setLightbox(true); }}
                aria-label="Ampliar"
              >
                <Expand size={16} />
              </button>
            </>
          )}

          {media.length > 1 && (
            <>
              <button className="gallery-nav prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Anterior">
                <ChevronLeft size={20} />
              </button>
              <button className="gallery-nav next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Próximo">
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <span className="gallery-counter">{index + 1} / {media.length}</span>
        </div>
      </div>

      {lightbox && current.type === "image" && (
        <div className="lightbox" onClick={() => setLightbox(false)}>
          <button className="lightbox-close" onClick={() => setLightbox(false)} aria-label="Fechar">
            <X size={22} />
          </button>
          {media.length > 1 && (
            <>
              <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Anterior">
                <ChevronLeft size={26} />
              </button>
              <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Próximo">
                <ChevronRight size={26} />
              </button>
            </>
          )}
          <img src={current.url} alt={current.title ?? "Foto"} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
