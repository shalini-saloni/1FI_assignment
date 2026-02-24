import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topBar}>
        <div className="container">
          <div className={styles.topInner}>
            <div className={styles.brand}>
              <div className={styles.brandIcon}>
                <span>1Fi</span>
              </div>
              <div>
                <div className={styles.brandName}>1Fi Smart EMI</div>
                <div className={styles.brandSub}>India's smartest way to buy on EMI</div>
              </div>
            </div>
            <div className={styles.trustBadges}>
              {[
                { icon: '🛡️', text: 'SSL Secured' },
                { icon: '🏦', text: 'RBI Regulated' },
                { icon: '✦',  text: '0% Interest' },
              ].map(b => (
                <div key={b.text} className={styles.badge}>
                  <span>{b.icon}</span>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainBar}>
        <div className="container">
          <div className={styles.mainGrid}>
            <div className={styles.col}>
              <div className={styles.colTitle}>Products</div>
              <div className={styles.colLinks}>
                <Link to="/products/iphone-17-pro" className={styles.colLink}>iPhone 17 Pro</Link>
                <Link to="/products/samsung-galaxy-s25-ultra" className={styles.colLink}>Samsung Galaxy S25 Ultra</Link>
                <Link to="/products/oneplus-13" className={styles.colLink}>OnePlus 13</Link>
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.colTitle}>EMI Plans</div>
              <div className={styles.colLinks}>
                <span className={styles.colLink}>3 Month Plans</span>
                <span className={styles.colLink}>12 Month Plans</span>
                <span className={styles.colLink}>60 Month Plans</span>
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.colTitle}>Support</div>
              <div className={styles.colLinks}>
                <span className={styles.colLink}>How it works</span>
                <span className={styles.colLink}>FAQs</span>
                <span className={styles.colLink}>Contact us</span>
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.colTitle}>Why 1Fi?</div>
              <div className={styles.emiInfo}>
                <div className={styles.emiInfoItem}>
                  <div className={styles.emiInfoNum}>0%</div>
                  <div className={styles.emiInfoLabel}>Interest on select plans</div>
                </div>
                <div className={styles.emiInfoItem}>
                  <div className={styles.emiInfoNum}>₹7,500</div>
                  <div className={styles.emiInfoLabel}>Max cashback per order</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className="container">
          <div className={styles.bottomInner}>
            <span className={styles.copy}>© 2025 1Fi Smart EMI · All rights reserved</span>
            <span className={styles.assignment}>Built for 1Fi Full Stack Developer Assignment</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
