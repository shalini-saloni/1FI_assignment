import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import ProductCard from '../components/ProductCard';
import styles from './HomePage.css';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroTag}>✦ Powered by Mutual Funds</div>
            <h1 className={styles.heroTitle}>
              Shop smarter with<br />
              <span className={styles.heroAccent}>0% interest EMI</span>
            </h1>
            <p className={styles.heroSub}>
              Get your favourite gadgets on flexible EMI plans — no hidden charges, cashback on select plans.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className={styles.products}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Products</h2>
            <p className={styles.sectionSub}>{products.length} products available</p>
          </div>

          {loading && (
            <div className={styles.grid}>
              {[1,2,3].map((i) => (
                <div key={i} className={styles.skeleton}>
                  <div className={`skeleton ${styles.skeletonImage}`} />
                  <div className={styles.skeletonContent}>
                    <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '40%', height: 12 }} />
                    <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '80%', height: 22 }} />
                    <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '60%', height: 14 }} />
                    <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '55%', height: 30 }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className={styles.error}>
              <div className={styles.errorIcon}>⚠</div>
              <h3>Failed to load products</h3>
              <p>{error}</p>
              <p style={{ fontSize: 13, marginTop: 8, opacity: 0.7 }}>
                Make sure the backend is running on <code>localhost:4000</code>
              </p>
            </div>
          )}

          {!loading && !error && (
            <div className={styles.grid}>
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust badges */}
      <section className={styles.trust}>
        <div className="container">
          <div className={styles.trustGrid}>
            {[
              { icon: '🛡️', label: 'Secure Transactions', desc: '256-bit SSL encryption' },
              { icon: '✦',  label: '0% Interest Plans',  desc: 'On select tenures' },
              { icon: '💸', label: 'Instant Cashback',   desc: 'Up to ₹7,500 back' },
              { icon: '📦', label: 'Free Delivery',      desc: 'On all orders' },
            ].map(({ icon, label, desc }) => (
              <div key={label} className={styles.trustItem}>
                <div className={styles.trustIcon}>{icon}</div>
                <div>
                  <div className={styles.trustLabel}>{label}</div>
                  <div className={styles.trustDesc}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
