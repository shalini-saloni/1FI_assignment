import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <span className={styles.logoMark}>1Fi</span>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>Smart EMI</span>
            <span className={styles.logoTagline}>by mutual funds</span>
          </div>
        </Link>

        <div className={styles.center}>
          <div className={styles.pill}>
            <span className={styles.pillDot} />
            EMI plans backed by mutual funds
          </div>
        </div>

        <div className={styles.right}>
          {!isHome ? (
            <Link to="/" className={styles.backBtn}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M8.5 2.5L4 7l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              All Products
            </Link>
          ) : (
            <div className={styles.navActions}>
              <div className={styles.secureTag}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1L10.5 3v3.5c0 2.5-2.25 4.25-4.5 4.5C1.75 10.75-.5 9 .5 6.5V3L6 1z" fill="currentColor" opacity=".15"/>
                  <path d="M6 1L10.5 3v3.5c0 2.5-2.25 4.25-4.5 4.5C1.75 10.75-.5 9 .5 6.5V3L6 1z" stroke="currentColor" strokeWidth="1"/>
                </svg>
                Secure & Safe
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
