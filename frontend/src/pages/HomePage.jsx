import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import ProductCard from '../components/ProductCard';

const BRANDS = ['All', 'Apple', 'Samsung', 'OnePlus'];

function SkeletonCard() {
  return (
    <div className="skel-card">
      <div className="skel skel-img" />
      <div className="skel-body">
        <div className="skel" style={{ height: 11, width: '34%', borderRadius: 99 }} />
        <div className="skel" style={{ height: 24, width: '72%', marginTop: 10 }} />
        <div className="skel" style={{ height: 11, width: '50%', marginTop: 6 }} />
        <div className="skel" style={{ height: 20, width: '48%', marginTop: 10 }} />
        <div className="skel" style={{ height: 40, width: '100%', marginTop: 8, borderRadius: 10 }} />
        <div className="skel" style={{ height: 36, width: '100%', marginTop: 8, borderRadius: 10 }} />
      </div>
    </div>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.getProducts()
      .then(data => { setProducts(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [retryKey]);

  const filtered = filter === 'All'
    ? products
    : products.filter(p => p.brand === filter);

  return (
    <div>
      {/* ─────────── HERO ─────────── */}
      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="hero-orb1" />
        <div className="hero-orb2" />

        <div className="container hero-layout">
          {/* Left */}
          <div className="hero-left">
            <div className="hero-chip">
              <span className="hero-chip-dot" />
              Powered by Mutual Funds
            </div>

            <h1 className="hero-title">
              Own it today,<br />
              <span className="hero-title-grad">pay at 0% interest</span>
            </h1>

            <p className="hero-sub">
              Shop premium smartphones on EMI plans backed by mutual funds.
              No credit card. No hidden charges. Cashback on every plan.
            </p>

            <div className="hero-stats">
              {[
                { num: '0%', label: 'Interest Rate' },
                { num: '₹7,500', label: 'Max Cashback' },
                { num: '60mo', label: 'Max Tenure' },
              ].map(s => (
                <div key={s.label}>
                  <div className="hero-stat-num">{s.num}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating EMI card */}
          <div className="hero-right">
            <div className="hero-card">
              <div className="hc-dots">
                <div className="hc-dot" style={{ background: '#FF5F57' }} />
                <div className="hc-dot" style={{ background: '#FFBD2E' }} />
                <div className="hc-dot" style={{ background: '#28CA42' }} />
              </div>

              <div className="hc-product-row">
                <span className="hc-product-name">iPhone 17 Pro · 256GB</span>
                <span className="hc-zero-badge">0% Interest</span>
              </div>

              <div className="hc-amount-row">
                <span className="hc-cur">₹</span>
                <span className="hc-num">11,242</span>
                <span className="hc-per">/month</span>
              </div>
              <div className="hc-sub">for 12 months · Save ₹7,500</div>

              <div className="hc-bar-track">
                <div className="hc-bar-fill" />
              </div>
              <div className="hc-bar-labels">
                <span>3 of 12 paid</span>
                <span className="hc-cashback-label">₹7,500 cashback</span>
              </div>

              <div className="hc-footer">
                <div className="hc-footer-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A6B3C" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  RBI Regulated
                </div>
                <div className="hc-footer-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A6B3C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Instant Approval
                </div>
              </div>
            </div>

            {/* Cashback popup badge */}
            <div className="hero-badge">
              <div className="hero-badge-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 000 4h4a2 2 0 010 4H8" />
                  <line x1="12" y1="6" x2="12" y2="8" /><line x1="12" y1="16" x2="12" y2="18" />
                </svg>
              </div>
              <div>
                <div className="hero-badge-title">Cashback Credited</div>
                <div className="hero-badge-sub">₹7,500 → Your Account</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── PRODUCTS ─────────── */}
      <section className="products-section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="section-sub">
                {loading
                  ? 'Loading from database...'
                  : error
                  ? 'Using offline data'
                  : `${filtered.length} products available on EMI`}
              </p>
            </div>
            <div className="filters">
              {BRANDS.map(b => (
                <button
                  key={b}
                  className={`filter-btn${filter === b ? ' active' : ''}`}
                  onClick={() => setFilter(b)}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Loading progress bar */}
          {loading && (
            <div className="loading-bar">
              <div className="loading-bar-fill" />
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div className="prod-grid">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : error ? (
            /* Error fallback — show products from api.js fallback data */
            <div className="prod-grid">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          ) : filtered.length > 0 ? (
            <div className="prod-grid">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#9A9590' }}>
              No products found for <strong>{filter}</strong>
            </div>
          )}
        </div>
      </section>

      {/* ─────────── HOW IT WORKS ─────────── */}
      <section className="how-section">
        <div className="how-grid-bg" />
        <div className="container">
          <div className="how-header">
            <div className="how-chip">How it works</div>
            <h2 className="how-title">Four steps to own your phone</h2>
            <p className="how-sub">Simple. Fast. Backed by mutual funds.</p>
          </div>

          <div className="how-steps">
            {[
              {
                n: '01', title: 'Choose Product', desc: 'Pick any product and variant',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                ),
              },
              {
                n: '02', title: 'Select EMI Plan', desc: '3 to 60 months, starting 0%',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                ),
              },
              {
                n: '03', title: 'Instant Approval', desc: 'No credit card — use mutual funds',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ),
              },
              {
                n: '04', title: 'Get Delivered', desc: 'Free delivery in 3–7 working days',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                ),
              },
            ].map(s => (
              <div key={s.n} className="how-step">
                <div className="how-step-num">{s.n}</div>
                <div className="how-step-icon">{s.icon}</div>
                <div className="how-step-title">{s.title}</div>
                <div className="how-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── TRUST STRIP ─────────── */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            {[
              {
                label: 'Secure Transactions', desc: '256-bit SSL encryption',
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
              },
              {
                label: 'Mutual Fund Backed', desc: 'RBI regulated & safe',
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="21" y2="22" /><line x1="6" y1="18" x2="6" y2="11" /><line x1="10" y1="18" x2="10" y2="11" /><line x1="14" y1="18" x2="14" y2="11" /><line x1="18" y1="18" x2="18" y2="11" /><polygon points="12 2 20 7 4 7" /></svg>,
              },
              {
                label: 'Instant Cashback', desc: 'Up to ₹7,500 per order',
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 000 4h4a2 2 0 010 4H8" /><line x1="12" y1="6" x2="12" y2="8" /><line x1="12" y1="16" x2="12" y2="18" /></svg>,
              },
              {
                label: '2-Day Replacement', desc: 'Service centre guarantee',
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" /></svg>,
              },
              {
                label: 'Free Delivery', desc: 'Pan India, all orders',
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
              },
              {
                label: '24/7 Support', desc: 'Always here to help',
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0118 0v6" /><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" /></svg>,
              },
            ].map(({ label, desc, icon }) => (
              <div key={label} className="trust-item">
                <div className="trust-icon">{icon}</div>
                <div>
                  <div className="trust-label">{label}</div>
                  <div className="trust-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
