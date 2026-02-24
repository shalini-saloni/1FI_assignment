import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, formatINR, calcDiscount } from '../lib/api';
import EMIPlanCard from '../components/EMIPlanCard';

function Spinner() {
  return (
    <div className="spinner-wrap">
      <div className="spinner">
        <div className="spinner-ring" />
        <span className="spinner-label">1Fi</span>
      </div>
      <p className="spinner-text">Loading product...</p>
    </div>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [variant, setVariant] = useState(null);
  const [plan, setPlan] = useState(null);
  const [proceeded, setProceeded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => {
    setLoading(true); setError(null);
    api.getProduct(slug)
      .then(data => {
        setProduct(data);
        const v = data.variants[0];
        setVariant(v);
        setPlan(v.emi_plans.find(p => p.is_popular) || v.emi_plans[0]);
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [slug]);

  const switchVariant = v => {
    setVariant(v);
    setImgLoaded(false); setImgErr(false);
    setPlan(v.emi_plans.find(p => p.is_popular) || v.emi_plans[0]);
    setProceeded(false);
  };

  const handleProceed = () => {
    setProceeded(true);
    setTimeout(() => setProceeded(false), 3500);
  };

  if (loading) return <div className="container"><Spinner /></div>;

  if (error || !product) return (
    <div className="container" style={{ padding: '80px 0' }}>
      <div className="error-box">
        <div className="error-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="error-title">Product not found</h2>
        <p className="error-msg">{error}</p>
        <button className="retry-btn" onClick={() => navigate('/')}>← Back to Products</button>
      </div>
    </div>
  );

  if (!variant) return null;

  const discount = calcDiscount(variant.mrp, variant.price);
  const savings = variant.mrp - variant.price;
  const storages = [...new Set(product.variants.map(v => v.storage))];
  const sameStorage = product.variants.filter(v => v.storage === variant.storage);

  return (
    <div className="prod-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container breadcrumb-inner">
          <button className="bc-btn" onClick={() => navigate('/')}>Home</button>
          <span className="bc-sep">›</span>
          <span className="bc-current">{product.name}</span>
        </div>
      </div>

      <div className="container">
        <div className="prod-layout">

          {/* ── LEFT: Image ── */}
          <div className="prod-img-col">
            <div className="prod-img-box">
              <div className="prod-new-badge">NEW</div>
              {discount > 0 && <div className="prod-disc-badge">{discount}% OFF</div>}

              {/* Skeleton */}
              {!imgLoaded && !imgErr && <div className="skel prod-img-skel" />}

              {/* Image — object-fit:contain fills box properly */}
              {!imgErr ? (
                <img
                  key={variant.id}
                  src={variant.image_url}
                  alt={`${product.name} ${variant.name}`}
                  className={imgLoaded ? '' : 'img-loading'}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => { setImgErr(true); setImgLoaded(true); }}
                />
              ) : (
                <div className="prod-img-fallback">
                  <div className="prod-img-fallback-icon">{product.brand[0]}</div>
                  <div className="prod-img-fallback-name">{product.name}</div>
                  <div className="prod-img-fallback-var">{variant.storage} · {variant.color}</div>
                </div>
              )}

              <div className="prod-img-overlay" />
            </div>

            {/* Color picker */}
            {sameStorage.length > 1 && (
              <div className="color-picker">
                <span className="color-label">Color: <strong>{variant.color}</strong></span>
                <div className="swatches">
                  {sameStorage.map(sv => (
                    <button
                      key={sv.id}
                      className={`swatch${sv.id === variant.id ? ' active' : ''}`}
                      style={{ background: sv.color_hex, border: 'none' }}
                      title={sv.color}
                      onClick={() => switchVariant(sv)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            <div className="highlights">
              {[
                {
                  label: 'Free Delivery',
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
                },
                {
                  label: '2-Day Replace',
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" /></svg>,
                },
                {
                  label: '1yr Warranty',
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
                },
              ].map(h => (
                <div key={h.label} className="highlight-item">
                  <span className="highlight-icon">{h.icon}</span>
                  <span>{h.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Details ── */}
          <div className="prod-details">
            <div>
              <div className="prod-brand-row">
                <span className="prod-brand-tag">{product.brand}</span>
                <span className="prod-cat">{product.category}</span>
              </div>
              <h1 className="prod-name" style={{ marginTop: 10, marginBottom: 6 }}>{product.name}</h1>
              <div className="prod-variant-label">{variant.storage} · {variant.color}</div>
            </div>

            {/* Price */}
            <div className="price-card">
              <div className="price-row">
                <span className="price-main">{formatINR(variant.price)}</span>
                {variant.mrp > variant.price && (
                  <span className="price-mrp">{formatINR(variant.mrp)}</span>
                )}
              </div>
              {savings > 0 && (
                <div className="price-save-row">
                  <span className="price-save-badge">You save {formatINR(savings)}</span>
                  <span className="price-disc-note">{discount}% off applied</span>
                </div>
              )}
            </div>

            {/* Storage */}
            {storages.length > 1 && (
              <div className="storage-group">
                <div className="group-label">Storage</div>
                <div className="storage-btns">
                  {storages.map(s => {
                    const sv = product.variants.find(x => x.storage === s && x.color === variant.color)
                      || product.variants.find(x => x.storage === s);
                    return (
                      <button
                        key={s}
                        className={`storage-btn${s === variant.storage ? ' active' : ''}`}
                        onClick={() => switchVariant(sv)}
                      >
                        {s}
                        {s !== variant.storage && sv && (
                          <span className="storage-btn-price">{formatINR(sv.price)}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* EMI Plans */}
            <div>
              <div className="emi-header">
                <div>
                  <div className="emi-title">EMI Plans</div>
                  <div className="emi-sub">backed by mutual funds · pick your plan</div>
                </div>
                <div className="emi-count">{variant.emi_plans.length} options</div>
              </div>
              <div className="emi-plans-list">
                {variant.emi_plans.map(p => (
                  <EMIPlanCard
                    key={p.id}
                    plan={p}
                    isSelected={plan?.id === p.id}
                    onSelect={setPlan}
                  />
                ))}
              </div>
            </div>

            {/* Proceed */}
            <div className="proceed-section">
              {plan && (
                <div className="plan-summary">
                  <div>
                    <div className="plan-sum-amt">{formatINR(plan.monthly_amount)}/mo</div>
                    <div className="plan-sum-tenure">× {plan.tenure_months} months</div>
                  </div>
                  <div className="plan-sum-tags">
                    {parseFloat(plan.interest_rate) === 0 && <span className="tag-zero">0% Interest</span>}
                    {parseFloat(plan.cashback_amount) > 0 && (
                      <span className="tag-cashback">+{formatINR(plan.cashback_amount)} cashback</span>
                    )}
                  </div>
                </div>
              )}

              <button
                className={`proceed-btn${proceeded ? ' success' : ''}`}
                onClick={handleProceed}
                disabled={!plan}
              >
                {proceeded ? (
                  <div className="proceed-btn-inner">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Plan Confirmed! Processing...
                  </div>
                ) : (
                  'Proceed with Selected Plan →'
                )}
              </button>

              <p className="disclaimer">
                * No credit card required · Backed by mutual funds · RBI regulated
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
