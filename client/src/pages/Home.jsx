import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import ArtworkGrid from '../components/ArtworkGrid';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const revealRefs = useRef([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/artworks');
        setFeatured(data.slice(0, 4));
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const categories = [
    { title: 'Blood Arts', className: 'cat-bg blood', image: '/cat-blood.jpg' },
    { title: 'Sketch Arts', className: 'cat-bg sketch', image: '/cat-sketch.jpg' },
    { title: 'Pencil Arts', className: 'cat-bg pencil', image: '/cat-pencil.jpg' },
    { title: 'Paintings', className: 'cat-bg paintings', image: '/cat-paint.jpg' },
    { title: 'Portraits', className: 'cat-bg portraits', image: '/cat-potrait.jpeg' },
  ];

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
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRevealRef = (el, index) => {
    revealRefs.current[index] = el;
  };

  return (
    <motion.section
      className="page home fade-in"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {/* Hero */}
      <div className="hero hero-split reveal" ref={(el) => setRevealRef(el, 0)}>
        <div className="hero-copy">
          <p className="eyebrow">Hello.. Welcome to My Page</p>
          <h1>This Is Karthik Ambati</h1>
          <p className="lede">
            Contemporary creator blending raw emotion and precision across Blood Arts,
            Sketches, Pencil works, Paintings, and Portraits.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="/gallery">
              View Gallery
            </a>
            <a className="btn secondary" href="/contact">
              Contact Artist
            </a>
          </div>
        </div>
        <div className="hero-photo">
          <div className="portrait-frame">
            <div className="portrait" aria-label="Artist portrait">
              <img src="/artist.jpg" alt="Karthik Ambati" loading="lazy" />
            </div>
          </div>
        </div>
        <div className="hero-panel">
          <p className="hero-tagline">“Every frame is a pulse of color and story.”</p>
          <div className="hero-stats">
            <div>
              <strong>5+</strong>
              <span>Years creating</span>
            </div>
            <div>
              <strong>200+</strong>
              <span>Artworks crafted</span>
            </div>
            <div>
              <strong>Portraits</strong>
              <span>and sketch artistry focus</span>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="section two-col reveal" ref={(el) => setRevealRef(el, 1)}>
        <div>
          <p className="eyebrow">About the Artist</p>
          <h2>Creative narrative</h2>
          <p className="lede">
            Karthik Ambati is a multidisciplinary artist exploring human emotions through
            vivid Blood Arts, delicate Sketch Arts, detailed Pencil renderings, layered
            Paintings, and lifelike Portrait Arts. Each piece blends storytelling with
            bold technique.
          </p>
        </div>
        <div className="about-card">
          <p>Styles mastered</p>
          <ul>
            <li>Blood Arts</li>
            <li>Sketch Arts</li>
            <li>Pencil Arts</li>
            <li>Paintings</li>
            <li>Portrait Arts</li>
          </ul>
        </div>
      </div>

      {/* Categories */}
      <div className="section reveal" ref={(el) => setRevealRef(el, 2)}>
        <div className="section-header">
          <div>
            <p className="eyebrow">Art Categories</p>
            <h2>Explore the spectrum</h2>
          </div>
        </div>
        <div className="category-grid">
          {categories.map((cat) => (
            <div key={cat.title} className="category-card">
              <div className={cat.className}>
                <img src={cat.image} alt={cat.title} className="cat-img" loading="lazy" />
                <div className="cat-overlay" />
              </div>
              <h4>{cat.title}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Featured */}
      <div className="section reveal" ref={(el) => setRevealRef(el, 3)}>
        <div className="section-header">
          <div>
            <p className="eyebrow">Featured</p>
            <h2>Signature works</h2>
          </div>
          <a className="btn ghost" href="/gallery">
            View all
          </a>
        </div>
        {featured.length ? (
          <ArtworkGrid artworks={featured} />
        ) : (
          <p className="muted">No artworks yet.</p>
        )}
      </div>

      {/* Journey */}
      <div className="section stats-section reveal" ref={(el) => setRevealRef(el, 4)}>
        <div>
          <p className="eyebrow">Journey</p>
          <h2>Experience & Craft</h2>
          <p className="muted">
            From intimate portraits to expansive mixed-media pieces, every artwork
            channels curiosity and disciplined technique.
          </p>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>5+ yrs</h3>
            <p>Dedicated to evolving visual narratives.</p>
          </div>
          <div className="stat-card">
            <h3>200+ pieces</h3>
            <p>Spanning sketches, paintings, and portraits.</p>
          </div>
          <div className="stat-card">
            <h3>Portrait focus</h3>
            <p>Capturing personality through light and line.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="section cta-section reveal" ref={(el) => setRevealRef(el, 5)}>
        <div>
          <p className="eyebrow">Commissions</p>
          <h2>Want a custom portrait or artwork?</h2>
          <p className="muted">
            Share your idea—Karthik will craft a bespoke piece that reflects your story.
          </p>
        </div>
        <div className="cta-actions">
          <a className="btn primary" href="/contact">
            Contact Artist
          </a>
          <a className="btn secondary" href="/gallery">
            Browse Gallery
          </a>
        </div>
      </div>

      {/* Footer mini */}
      <div className="section home-footer reveal" ref={(el) => setRevealRef(el, 6)}>
        <div>
          <h4>AK Arts 05</h4>
          <p className="muted">Portfolio of Karthik Ambati</p>
          <p className="muted">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
        <div className="home-footer-links">
          <a href="/home">Home</a>
          <a href="/gallery">Gallery</a>
          <a href="/contact">Contact</a>
          <a href="/admin/login">Admin</a>
        </div>
      </div>
    </motion.section>
  );
};

export default Home;
