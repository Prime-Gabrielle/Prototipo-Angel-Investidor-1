import { useRef, useState, useEffect } from "react";
import { UploadCloud, X, ImageIcon, Film } from "lucide-react";
import "./media.css";

interface LocalMedia {
  id: string;
  type: "image" | "video";
  url: string;
  name: string;
}

export default function MediaUploader({
  onChange,
}: {
  onChange?: (items: LocalMedia[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<LocalMedia[]>([]);
  const [drag, setDrag] = useState(false);

  useEffect(() => {
    onChange?.(items);
    return () => {
      items.forEach((it) => URL.revokeObjectURL(it.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const next: LocalMedia[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/") || f.type.startsWith("video/"))
      .map((f) => ({
        id: `${f.name}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        type: f.type.startsWith("video/") ? "video" : "image",
        url: URL.createObjectURL(f),
        name: f.name,
      }));
    setItems((prev) => [...prev, ...next]);
  };

  const remove = (id: string) => {
    setItems((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.id !== id);
    });
  };

  return (
    <div>
      <div
        className={`dropzone ${drag ? "drag" : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          addFiles(e.dataTransfer.files);
        }}
        role="button"
        tabIndex={0}
      >
        <span className="dropzone-icon"><UploadCloud size={26} /></span>
        <strong style={{ display: "block", fontSize: "0.95rem" }}>
          Arraste fotos e vídeos ou clique para enviar
        </strong>
        <span className="text-muted" style={{ fontSize: "0.82rem" }}>
          JPG, PNG, WEBP ou MP4 · até 50MB por arquivo
        </span>
        <div className="row gap-12" style={{ justifyContent: "center", marginTop: 12 }}>
          <span className="badge badge-primary"><ImageIcon size={13} /> Fotos</span>
          <span className="badge badge-accent"><Film size={13} /> Vídeos</span>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          hidden
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {items.length > 0 && (
        <>
          <div className="row between" style={{ marginTop: 16, marginBottom: 4 }}>
            <span style={{ fontSize: "0.84rem", fontWeight: 600 }}>
              {items.length} arquivo(s) adicionado(s)
            </span>
            <button className="text-danger" style={{ fontSize: "0.82rem", fontWeight: 600 }} onClick={() => setItems([])}>
              Remover todos
            </button>
          </div>
          <div className="upload-grid">
            {items.map((it) => (
              <div key={it.id} className="upload-item">
                {it.type === "video" ? (
                  <video src={it.url} muted />
                ) : (
                  <img src={it.url} alt={it.name} />
                )}
                <button className="remove" onClick={() => remove(it.id)} aria-label="Remover">
                  <X size={14} />
                </button>
                <span className="type-tag">{it.type === "video" ? "VÍDEO" : "FOTO"}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
