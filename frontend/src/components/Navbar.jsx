import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMark}>1Fi</span>
          <span className={styles.logoSub}>Smart EMI</span>
        </Link>
        <div className={styles.right}>
          <span className={styles.tagline}>EMI plans backed by mutual funds</span>
          {!isHome && (
            <Link to="/" className={styles.backBtn}>
              ← All Products
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
