import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="nav-left">
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="nav-brand">
          <Link to="/home" onClick={close}>
            AK Arts 05
          </Link>
        </div>
      </div>
      <nav className={open ? 'nav-links open' : 'nav-links'}>
        <NavLink to="/home" end onClick={close}>
          Home
        </NavLink>
        <NavLink to="/gallery" onClick={close}>
          Gallery
        </NavLink>
        <NavLink to="/contact" onClick={close}>
          Contact
        </NavLink>
        <NavLink to="/admin/login" onClick={close}>
          Admin
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
