import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-inner">

        <Link to="/" className="nav-logo">
          <div className="nav-logo-box">
            <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
              <text x="0" y="17" fontFamily="'Syne',sans-serif" fontSize="17" fontWeight="800" fill="white" letterSpacing="-0.5">1Fi</text>
            </svg>
          </div>
          <div className="nav-logo-text">
            <span className="nav-logo-name">Smart EMI</span>
            <span className="nav-logo-sub">backed by mutual funds</span>
          </div>
        </Link>

        <div className="nav-pill">
          <div className="nav-pill-inner">
            <span className="nav-dot" />
            EMI plans backed by mutual funds
          </div>
        </div>

        {!isHome ? (
          <Link to="/" className="nav-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            All Products
          </Link>
        ) : (
          <div className="nav-secure">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Secure & Safe
          </div>
        )}
      </div>
    </nav>
  );
}
