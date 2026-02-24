import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, formatINR, calcDiscount } from '../lib/api';
import EMIPlanCard from '../components/EMIPlanCard';
import styles from './ProductPage.css';

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [proceeded, setProceeded] = useState(false);

  useEffect(() => {
    api.getProduct(slug)
      .then((data) => {
        setProduct(data);
        const defaultVariant = data.variants[0];
        setSelectedVariant(defaultVariant);
        const popular = defaultVariant.emi_plans.find((p) => p.is_popular);
        setSelectedPlan(popular || defaultVariant.emi_plans[0]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    const popular = variant.emi_plans.find((p) => p.is_popular);
    setSelectedPlan(popular || variant.emi_plans[0]);
    setProceeded(false);
  };

  const handleProceed = () => {
    if (!selectedPlan) return;
    setProceeded(true);
    setTimeout(() => setProceeded(false), 3000);
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorView error={error} onBack={() => navigate('/')} />;
  if (!product) return null;

  const discount = calcDiscount(selectedVariant.mrp, selectedVariant.price);
  const savings = selectedVariant.mrp - selectedVariant.price;

  const storages = [...new Set(product.variants.map((v) => v.storage))];
  const selectedStorage = selectedVariant.storage;
  const selectedColor = selectedVariant.color;

  const variantsForStorage = product.variants.filter((v) => v.storage === selectedStorage);

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.layout}>
          {/* Left: Product image */}
          <div className={styles.imageSection}>
            <div className={styles.imageWrap}>
              <div className={styles.imageBadge}>NEW</div>
              <img
                key={selectedVariant.id}
                src={selectedVariant.image_url}
                alt={`${product.name} - ${selectedVariant.name}`}
                className={styles.image}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/500x500/F0EDE8/9A9590?text=${encodeURIComponent(product.name)}`;
                }}
              />
            </div>

            {/* Color swatches */}
            <div className={styles.colorOptions}>
              <div className={styles.optionLabel}>Color: <strong>{selectedColor}</strong></div>
              <div className={styles.swatches}>
                {variantsForStorage.map((v) => (
                  <button
                    key={v.id}
                    className={`${styles.swatch} ${v.id === selectedVariant.id ? styles.swatchActive : ''}`}
                    style={{ '--swatch-color': v.color_hex }}
                    onClick={() => handleVariantChange(v)}
                    title={v.color}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className={styles.details}>
            <div className={styles.brandBadge}>{product.brand}</div>
            <h1 className={styles.productName}>{product.name}</h1>
            <div className={styles.variantSub}>{selectedVariant.storage}</div>

            {/* Pricing */}
            <div className={styles.pricingBlock}>
              <div className={styles.price}>{formatINR(selectedVariant.price)}</div>
              <div className={styles.mrpRow}>
                <span className={styles.mrp}>{formatINR(selectedVariant.mrp)}</span>
                {discount > 0 && (
                  <>
                    <span className={styles.discountBadge}>{discount}% off</span>
                    <span className={styles.savings}>Save {formatINR(savings)}</span>
                  </>
                )}
              </div>
            </div>

            {/* Storage options */}
            {storages.length > 1 && (
              <div className={styles.optionGroup}>
                <div className={styles.optionLabel}>Storage</div>
                <div className={styles.optionButtons}>
                  {storages.map((stor) => {
                    const v = product.variants.find((x) => x.storage === stor && x.color === selectedColor)
                      || product.variants.find((x) => x.storage === stor);
                    return (
                      <button
                        key={stor}
                        className={`${styles.optionBtn} ${stor === selectedStorage ? styles.optionBtnActive : ''}`}
                        onClick={() => handleVariantChange(v)}
                      >
                        {stor}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* EMI Plans */}
            <div className={styles.emiSection}>
              <div className={styles.emiHeader}>
                <div className={styles.emiTitle}>EMI Plans backed by mutual funds</div>
                <div className={styles.emiCount}>{selectedVariant.emi_plans.length} options</div>
              </div>

              <div className={styles.plansList}>
                {selectedVariant.emi_plans.map((plan) => (
                  <EMIPlanCard
                    key={plan.id}
                    plan={plan}
                    isSelected={selectedPlan?.id === plan.id}
                    onSelect={setSelectedPlan}
                  />
                ))}
              </div>
            </div>

            {/* Proceed button */}
            <div className={styles.proceedSection}>
              {selectedPlan && (
                <div className={styles.selectedSummary}>
                  Selected: <strong>{selectedPlan.tenure_months} months</strong> @ <strong>{formatINR(selectedPlan.monthly_amount)}/mo</strong>
                  {(selectedPlan.interest_rate === 0 || selectedPlan.interest_rate === '0.00') && (
                    <span className={styles.zeroTag}>0% interest</span>
                  )}
                </div>
              )}
              <button
                className={`${styles.proceedBtn} ${!selectedPlan ? styles.proceedBtnDisabled : ''} ${proceeded ? styles.proceedBtnSuccess : ''}`}
                onClick={handleProceed}
                disabled={!selectedPlan}
              >
                {proceeded ? '✓ Plan Selected! Proceeding...' : 'Proceed with Selected Plan'}
              </button>
              <p className={styles.disclaimer}>
                * EMI backed by mutual funds. No credit card required. Subject to eligibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        <div className="skeleton" style={{ aspectRatio: '1', borderRadius: 20 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[80, 200, 120, 150, 300].map((w, i) => (
            <div key={i} className="skeleton" style={{ height: i === 1 ? 40 : i === 4 ? 120 : 20, width: `${w}px`, maxWidth: '100%' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ErrorView({ error, onBack }) {
  return (
    <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 8 }}>Product not found</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>{error}</p>
      <button
        onClick={onBack}
        style={{
          background: 'var(--accent)', color: 'white',
          border: 'none', padding: '12px 28px',
          borderRadius: 99, fontSize: 14, fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Back to Products
      </button>
    </div>
  );
}
