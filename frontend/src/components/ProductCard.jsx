import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatINR, calcDiscount } from '../lib/api';

export default function ProductCard({ product, index }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const discount = calcDiscount(product.mrp, product.price);
  const savings = product.mrp - product.price;

  return (
    <Link
      to={`/products/${product.slug}`}
      className="prod-card"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* ── Image ── */}
      <div className="card-img-wrap">
        {discount > 0 && <span className="card-badge-discount">{discount}% off</span>}
        <span className="card-badge-new">New</span>

        {/* Skeleton while loading */}
        {!imgLoaded && !imgErr && <div className="skel card-img-skel" />}

        {/* Real image — fills full box */}
        {!imgErr ? (
          <img
            src={product.image_url}
            alt={product.name}
            style={{ opacity: imgLoaded ? 1 : 0 }}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgErr(true)}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%', background: '#E4DFD8',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-d)', fontSize: 26, fontWeight: 800, color: '#9A9590',
            }}>
              {product.brand[0]}
            </div>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: 17, fontWeight: 700, color: '#5C5754', textAlign: 'center', padding: '0 16px' }}>
              {product.name}
            </div>
          </div>
        )}

        <div className="card-img-overlay" />
      </div>

      {/* ── Content ── */}
      <div className="card-body">
        <div className="card-brand-row">
          <span className="card-brand-tag">{product.brand}</span>
          {savings > 0 && <span className="card-savings">Save {formatINR(savings)}</span>}
        </div>

        <h3 className="card-name">{product.name}</h3>
        <div className="card-variant">{product.variant_name}</div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 2 }}>
          <span style={{ fontFamily: 'var(--font-d)', fontSize: 22, fontWeight: 800, letterSpacing: '-0.025em' }}>
            {formatINR(product.price)}
          </span>
          {product.mrp > product.price && (
            <span style={{ fontSize: 13, color: '#9A9590', textDecoration: 'line-through' }}>
              {formatINR(product.mrp)}
            </span>
          )}
        </div>

        {product.min_emi && (
          <div className="card-emi-strip">
            <span>EMI from <strong>{formatINR(product.min_emi)}/mo</strong></span>
            <span className="card-emi-badge">0% Interest</span>
          </div>
        )}

        <div className="card-cta">
          <span>View EMI Plans</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
