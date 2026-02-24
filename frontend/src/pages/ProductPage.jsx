import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, formatINR, calcDiscount } from '../lib/api';
import EMIPlanCard from '../components/EMIPlanCard';
import styles from './ProductPage.module.css';

function Spinner() {
  return (
    <div className={styles.spinnerWrap}>
      <div className={styles.spinnerOuter}>
        <div className={styles.spinnerInner} />
        <div className={styles.spinnerLogo}>1Fi</div>
      </div>
      <p className={styles.spinnerText}>Loading product...</p>
    </div>
  );
}

function ErrorView({ error, onBack }) {
  return (
    <div className={styles.errorWrap}>
      <div className={styles.errorIcon}>😕</div>
      <h2 className={styles.errorTitle}>Product not found</h2>
      <p className={styles.errorMsg}>{error}</p>
      <button onClick={onBack} className={styles.errorBtn}>← Back to Products</button>
    </div>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [proceeded, setProceeded] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getProduct(slug)
      .then((data) => {
        setProduct(data);
        const def = data.variants[0];
        setSelectedVariant(def);
        setSelectedPlan(def.emi_plans.find(p => p.is_popular) || def.emi_plans[0]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleVariantChange = (v) => {
    setSelectedVariant(v);
    setSelectedPlan(v.emi_plans.find(p => p.is_popular) || v.emi_plans[0]);
    setProceeded(false);
    setImgErr(false);
    setImgLoading(true);
  };

  const handleProceed = () => {
    if (!selectedPlan) return;
    setProceeded(true);
    setTimeout(() => setProceeded(false), 3500);
  };

  if (loading) return <div className="container" style={{padding:'80px 0'}}><Spinner /></div>;
  if (error)   return <div className="container" style={{padding:'80px 0'}}><ErrorView error={error} onBack={() => navigate('/')} /></div>;
  if (!product) return null;

  const v = selectedVariant;
  const discount = calcDiscount(v.mrp, v.price);
  const savings   = v.mrp - v.price;
  const storages  = [...new Set(product.variants.map(x => x.storage))];
  const sameStorageVariants = product.variants.filter(x => x.storage === v.storage);

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <div className={styles.breadcrumbInner}>
            <button onClick={() => navigate('/')} className={styles.breadBtn}>Home</button>
            <span className={styles.breadSep}>›</span>
            <span className={styles.breadCurrent}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>

          {/* ─── LEFT: Image ─── */}
          <div className={styles.imageSection}>
            <div className={styles.imageWrap}>
              {/* New badge */}
              <div className={styles.newBadge}>NEW</div>

              {/* Discount badge */}
              {discount > 0 && (
                <div className={styles.discBadge}>{discount}% OFF</div>
              )}

              {/* Image with loading state */}
              <div className={styles.imageContainer}>
                {imgLoading && !imgErr && (
                  <div className={styles.imgSkeleton}>
                    <div className={`skeleton ${styles.imgSkeletonInner}`} />
                  </div>
                )}
                {!imgErr ? (
                  <img
                    key={v.id}
                    src={v.image_url}
                    alt={`${product.name} ${v.name}`}
                    className={`${styles.productImg} ${imgLoading ? styles.imgHidden : ''}`}
                    onLoad={() => setImgLoading(false)}
                    onError={() => { setImgErr(true); setImgLoading(false); }}
                  />
                ) : (
                  <div className={styles.imgFallback}>
                    <div className={styles.imgFallbackIcon}>{product.brand[0]}</div>
                    <div className={styles.imgFallbackName}>{product.name}</div>
                    <div className={styles.imgFallbackVariant}>{v.storage} · {v.color}</div>
                  </div>
                )}
              </div>

              {/* Ambient glow */}
              <div className={styles.imageGlow} style={{ '--glow-color': v.color_hex || '#ccc' }} />
            </div>

            {/* Color picker */}
            {sameStorageVariants.length > 1 && (
              <div className={styles.colorPicker}>
                <div className={styles.colorPickerLabel}>
                  Color: <strong>{v.color}</strong>
                </div>
                <div className={styles.swatches}>
                  {sameStorageVariants.map(sv => (
                    <button
                      key={sv.id}
                      className={`${styles.swatch} ${sv.id === v.id ? styles.swatchActive : ''}`}
                      style={{ background: sv.color_hex }}
                      title={sv.color}
                      onClick={() => handleVariantChange(sv)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Product highlights */}
            <div className={styles.highlights}>
              {[
                { icon:'🚚', text:'Free Delivery' },
                { icon:'🔄', text:'2-Day Replacement' },
                { icon:'✅', text:'1 Year Warranty' },
              ].map(h => (
                <div key={h.text} className={styles.highlight}>
                  <span>{h.icon}</span>
                  <span>{h.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT: Details ─── */}
          <div className={styles.details}>

            {/* Brand + name */}
            <div className={styles.brandRow}>
              <span className={styles.brandTag}>{product.brand}</span>
              <span className={styles.categoryTag}>{product.category}</span>
            </div>
            <h1 className={styles.productName}>{product.name}</h1>
            <div className={styles.variantLabel}>{v.storage} · {v.color}</div>

            {/* Price */}
            <div className={styles.pricingCard}>
              <div className={styles.priceRow}>
                <span className={styles.price}>{formatINR(v.price)}</span>
                {v.mrp > v.price && (
                  <span className={styles.mrp}>{formatINR(v.mrp)}</span>
                )}
              </div>
              {discount > 0 && (
                <div className={styles.savingsRow}>
                  <span className={styles.savingsBadge}>You save {formatINR(savings)}</span>
                  <span className={styles.discTag}>{discount}% discount applied</span>
                </div>
              )}
            </div>

            {/* Storage selector */}
            {storages.length > 1 && (
              <div className={styles.storageGroup}>
                <div className={styles.groupLabel}>Storage</div>
                <div className={styles.storageBtns}>
                  {storages.map(s => {
                    const sv = product.variants.find(x => x.storage === s && x.color === v.color)
                             || product.variants.find(x => x.storage === s);
                    return (
                      <button
                        key={s}
                        className={`${styles.storageBtn} ${s === v.storage ? styles.storageBtnActive : ''}`}
                        onClick={() => handleVariantChange(sv)}
                      >
                        {s}
                        {s !== v.storage && sv && (
                          <span className={styles.storageBtnPrice}>{formatINR(sv.price)}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* EMI Plans */}
            <div className={styles.emiSection}>
              <div className={styles.emiSectionHeader}>
                <div>
                  <div className={styles.emiTitle}>EMI Plans</div>
                  <div className={styles.emiSubtitle}>backed by mutual funds · select your plan</div>
                </div>
                <div className={styles.emiCount}>
                  {v.emi_plans.length} options
                </div>
              </div>

              <div className={styles.plansList}>
                {v.emi_plans.map(plan => (
                  <EMIPlanCard
                    key={plan.id}
                    plan={plan}
                    isSelected={selectedPlan?.id === plan.id}
                    onSelect={setSelectedPlan}
                  />
                ))}
              </div>
            </div>

            {/* Proceed */}
            <div className={styles.proceedSection}>
              {selectedPlan && (
                <div className={styles.planSummary}>
                  <div className={styles.planSummaryLeft}>
                    <div className={styles.planSummaryAmt}>{formatINR(selectedPlan.monthly_amount)}<span>/mo</span></div>
                    <div className={styles.planSummaryTenure}>× {selectedPlan.tenure_months} months</div>
                  </div>
                  <div className={styles.planSummaryRight}>
                    {(parseFloat(selectedPlan.interest_rate) === 0) && (
                      <span className={styles.planZeroTag}>0% Interest</span>
                    )}
                    {parseFloat(selectedPlan.cashback_amount) > 0 && (
                      <span className={styles.planCashbackTag}>+{formatINR(selectedPlan.cashback_amount)} cashback</span>
                    )}
                  </div>
                </div>
              )}

              <button
                className={`${styles.proceedBtn} ${proceeded ? styles.proceedSuccess : ''}`}
                onClick={handleProceed}
                disabled={!selectedPlan}
              >
                {proceeded ? (
                  <span className={styles.proceedSuccessContent}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="9" r="9" fill="rgba(255,255,255,0.2)"/>
                      <path d="M5.5 9l2.5 2.5 4-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Plan confirmed! Processing...
                  </span>
                ) : (
                  'Proceed with Selected Plan →'
                )}
              </button>

              <p className={styles.disclaimer}>
                * No credit card required · Backed by mutual funds · RBI regulated
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
