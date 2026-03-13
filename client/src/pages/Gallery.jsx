import { useEffect, useMemo, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import ArtworkGrid from '../components/ArtworkGrid';
import CategoryFilter from '../components/CategoryFilter';
import SkeletonCard from '../components/SkeletonCard';

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [active, setActive] = useState('All');
  const [loading, setLoading] = useState(true);
  const revealRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/artworks');
        setArtworks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    if (active === 'All') return artworks;
    return artworks.filter((a) => a.category === active);
  }, [active, artworks]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (revealRef.current) observer.observe(revealRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      className="page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <div className="section-header reveal" ref={revealRef}>
        <div>
          <p className="eyebrow">Gallery</p>
          <h2>Curated Works</h2>
        </div>
      </div>

      <CategoryFilter active={active} onSelect={setActive} />

      {loading ? (
        <div className="art-grid">
          {Array.from({ length: 8 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : filtered.length ? (
        <ArtworkGrid artworks={filtered} />
      ) : (
        <p className="muted">No artworks in this category yet.</p>
      )}
    </motion.section>
  );
};

export default Gallery;
