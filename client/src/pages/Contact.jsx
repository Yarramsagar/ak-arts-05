import { motion } from 'framer-motion';

const Contact = () => {
  const phone = '+919640648232';
  const email = 'Koteswararaoambati2000';
  const whatsappNumber = '+919640648232'; // in international format without +

  return (
    <motion.section
      className="page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <div className="section">
        <p className="eyebrow">Contact</p>
        <h2>Let&apos;s click on below menus</h2>
        <ul className="contact-list">
          <li>
            <span className="contact-icon">📞</span>
            <a className="contact-link" href={`tel:${phone.replace(/\s+/g, '')}`}>
              {phone}
            </a>
          </li>
          <li>
            <span className="contact-icon">✉️</span>
            <a className="contact-link" href={`mailto:${email}`}>
              {email}
            </a>
          </li>
        </ul>
        <a
          className="btn secondary contact-whatsapp"
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="contact-icon">💬</span> Chat on WhatsApp
        </a>
      </div>
    </motion.section>
  );
};

export default Contact;
