import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Landing = () => {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

  return (
    <motion.section
      className={`landing ${exiting ? 'fade-out' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <div className="landing-inner">
        <p className="eyebrow fade-in">Hello This is Karthik Ambati Heartly Welcome To My Page</p>
        <h1 className="landing-title fade-in">AK Arts 05</h1>
        <p className="landing-sub fade-in">
          Blood Arts · Sketch Arts · Pencil Arts · Paintings · Portraits
        </p>
        <button
          className="btn primary landing-btn fade-in"
          onClick={() => {
            setExiting(true);
            setTimeout(() => navigate('/home'), 400);
          }}
        >
          Enter to AK Arts
        </button>
      </div>
    </motion.section>
  );
};

export default Landing;
