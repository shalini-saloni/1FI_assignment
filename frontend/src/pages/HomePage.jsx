import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import ProductCard from '../components/ProductCard';
import styles from './HomePage.module.css';

const BRANDS = ['All', 'Apple', 'Samsung', 'OnePlus'];

function LoadingOverlay() {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingSpinner}>
        <div className={styles.spinnerRing} />
        <div className={styles.spinnerLogo}>1Fi</div>
      </div>
      <p className={styles.loadingText}>Fetching latest products...</p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={`skeleton ${styles.skeletonImg}`} />
      <div className={styles.skeletonBody}>
        <div className="skeleton" style={{ height:12, width:'35%', borderRadius:99 }} />
        <div className="skeleton" style={{ height:24, width:'70%', marginTop:10 }} />
        <div className="skeleton" style={{ height:12, width:'50%', marginTop:6 }} />
        <div className="skeleton" style={{ height:28, width:'55%', marginTop:12 }} />
        <div className="skeleton" style={{ height:40, width:'100%', marginTop:8, borderRadius:10 }} />
        <div className="skeleton" style={{ height:36, width:'100%', marginTop:8, borderRadius:10 }} />
      </div>
    </div>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [retryCount]);

  const filtered = filter === 'All' ? products : products.filter(p => p.brand === filter);

  return (
    <div className={styles.page}>

      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
          <div className={styles.heroGrid} />
        </div>

        <div className={`container ${styles.heroLayout}`}>
          <div className={styles.heroContent}>
            <div className={styles.heroChip}>
              <span className={styles.chipDot} />
              Powered by Mutual Funds
              <span className={styles.chipArrow}>→</span>
            </div>

            <h1 className={styles.heroTitle}>
              Own it today,
              <br />
              <span className={styles.heroAccent}>pay later at 0%</span>
            </h1>

            <p className={styles.heroSub}>
              Premium smartphones on EMI plans backed by mutual funds.
              No credit card, no hidden charges, cashback on every plan.
            </p>

            <div className={styles.heroStats}>
              {[
                { num: '0%', label: 'Interest Rate' },
                { num: '₹7,500', label: 'Max Cashback' },
                { num: '60', label: 'Max Months' },
              ].map((s, i) => (
                <div key={s.label} className={styles.stat}>
                  <div className={styles.statNum}>{s.num}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating EMI card visual */}
          <div className={styles.heroVisual}>
            <div className={styles.floatingCard}>
              <div className={styles.fcHeader}>
                <div className={styles.fcDots}>
                  <span /><span /><span />
                </div>
                <span className={styles.fcTitle}>1Fi EMI Plan</span>
              </div>
              <div className={styles.fcProduct}>
                <div className={styles.fcProductName}>iPhone 17 Pro · 256GB</div>
                <div className={styles.fcBadge}>0% Interest</div>
              </div>
              <div className={styles.fcAmount}>
                <span className={styles.fcCur}>₹</span>
                <span className={styles.fcNum}>11,242</span>
                <span className={styles.fcPer}>/month</span>
              </div>
              <div className={styles.fcSub}>for 12 months · Save ₹7,500</div>
              <div className={styles.fcBar}>
                <div className={styles.fcBarTrack}>
                  <div className={styles.fcBarFill} />
                </div>
                <div className={styles.fcBarLabels}>
                  <span>3 of 12 paid</span>
                  <span className={styles.fcCashback}>₹7,500 cashback</span>
                </div>
              </div>
              <div className={styles.fcFooter}>
                <div className={styles.fcFooterItem}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1l4.5 2v3.5C10.5 9 8.25 10.75 6 11c-2.25-.25-4.5-2-4.5-4.5V3L6 1z" fill="#1B6F40" opacity=".15"/>
                    <path d="M6 1l4.5 2v3.5C10.5 9 8.25 10.75 6 11c-2.25-.25-4.5-2-4.5-4.5V3L6 1z" stroke="#1B6F40" strokeWidth="1"/>
                  </svg>
                  RBI Regulated
                </div>
                <div className={styles.fcFooterItem}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5" stroke="#1B6F40" strokeWidth="1"/>
                    <path d="M4 6l1.5 1.5L8 4" stroke="#1B6F40" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  Instant Approval
                </div>
              </div>
            </div>

            <div className={styles.floatingBadge}>
              <span className={styles.fbIcon}>💸</span>
              <div>
                <div className={styles.fbTitle}>Cashback Credited</div>
                <div className={styles.fbSub}>₹7,500 → Your Account</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS ─── */}
      <section className={styles.products}>
        <div className="container">
          <div className={styles.sectionTop}>
            <div>
              <h2 className={styles.sectionTitle}>Featured Products</h2>
              <p className={styles.sectionSub}>
                {loading ? 'Loading products from database...' : error ? 'Connection error' : `${filtered.length} products available on EMI`}
              </p>
            </div>
            <div className={styles.filters}>
              {BRANDS.map(brand => (
                <button
                  key={brand}
                  className={`${styles.filterBtn} ${filter === brand ? styles.filterActive : ''}`}
                  onClick={() => setFilter(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div>
              <div className={styles.loadingBar}>
                <div className={styles.loadingBarFill} />
              </div>
              <div className={styles.grid}>
                {[1,2,3].map(i => <SkeletonCard key={i} />)}
              </div>
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className={styles.error}>
              <div className={styles.errorIconWrap}>
                <span className={styles.errorIcon}>⚡</span>
              </div>
              <h3 className={styles.errorTitle}>Backend not connected</h3>
              <p className={styles.errorMsg}>
                Could not reach the API server. Make sure your backend is running.
              </p>
              <code className={styles.errorCode}>cd backend && npm run dev</code>
              <button className={styles.retryBtn} onClick={() => setRetryCount(c => c+1)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{marginRight:6}}>
                  <path d="M12 7A5 5 0 112 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M12 3v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Retry Connection
              </button>
            </div>
          )}

          {/* Products grid */}
          {!loading && !error && filtered.length > 0 && (
            <div className={styles.grid}>
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className={styles.empty}>
              <span style={{ fontSize: 40 }}>🔍</span>
              <p>No products for <strong>{filter}</strong></p>
            </div>
          )}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className={styles.howSection}>
        <div className="container">
          <div className={styles.howHeader}>
            <span className={styles.howChip}>How it works</span>
            <h2 className={styles.howTitle}>Buy smart with 1Fi EMI</h2>
            <p className={styles.howSub}>Four simple steps from product selection to delivery</p>
          </div>
          <div className={styles.steps}>
            {[
              { n:'01', icon:'📱', title:'Choose Product', desc:'Pick any product and variant that suits you' },
              { n:'02', icon:'💳', title:'Select EMI Plan', desc:'Choose from 3 to 60 month tenures at 0% or low interest' },
              { n:'03', icon:'✅', title:'Instant Approval', desc:'No credit card needed, backed by your mutual funds' },
              { n:'04', icon:'📦', title:'Get Delivered', desc:'Free delivery within 3–7 working days' },
            ].map((step, i) => (
              <div key={step.n} className={styles.step}>
                <div className={styles.stepNum}>{step.n}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.desc}</p>
                {i < 3 && <div className={styles.stepConnector} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      <section className={styles.trustSection}>
        <div className="container">
          <div className={styles.trustGrid}>
            {[
              { icon:'🛡️', label:'Secure Transactions',   desc:'256-bit SSL encryption' },
              { icon:'🏦', label:'Mutual Fund Backed',    desc:'RBI regulated & safe' },
              { icon:'💸', label:'Cashback Guaranteed',   desc:'Up to ₹7,500 on select plans' },
              { icon:'🔄', label:'2-Day Replacement',     desc:'Service centre guarantee' },
              { icon:'🚚', label:'Free Delivery',         desc:'On all orders, pan India' },
              { icon:'📞', label:'24/7 Support',          desc:'Always here to help' },
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
