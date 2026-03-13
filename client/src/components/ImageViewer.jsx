import { useEffect, useState } from 'react';

const ImageViewer = ({ artwork, onClose }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!artwork) return null;

  useEffect(() => {
    // reset zoom when item changes
    setScale(1);
  }, [artwork]);

  const adjustZoom = (delta) =>
    setScale((s) => Math.min(3, Math.max(1, parseFloat((s + delta).toFixed(2)))));

  const handleWheel = (e) => {
    e.preventDefault();
    adjustZoom(e.deltaY > 0 ? -0.1 : 0.1);
  };

  const toggleZoom = () => setScale((s) => (s === 1 ? 2 : 1));

  const stop = (e) => e.stopPropagation();

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightbox-inner fade-in" onClick={stop} onWheel={handleWheel}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="lightbox-img-wrap" onDoubleClick={toggleZoom}>
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="lightbox-img"
            style={{ transform: `scale(${scale})` }}
            loading="lazy"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="zoom-controls">
            <button type="button" onClick={() => adjustZoom(0.2)} aria-label="Zoom in">
              +
            </button>
            <button type="button" onClick={() => adjustZoom(-0.2)} aria-label="Zoom out">
              −
            </button>
            <button type="button" onClick={() => setScale(1)} aria-label="Reset zoom">
              1:1
            </button>
          </div>
        </div>
        <div className="lightbox-meta">
          <h3>{artwork.title}</h3>
          <p>{artwork.category}</p>
          <button className="btn ghost" type="button" onClick={onClose}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
