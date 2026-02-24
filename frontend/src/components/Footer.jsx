import styles from './Footer.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.brand}>1Fi Smart EMI</p>
        <p className={styles.copy}>© 2026 · EMI Plans Backed by Mutual Funds · Made for 1Fi Full Stack Assignment</p>
      </div>
    </footer>
  );
}
