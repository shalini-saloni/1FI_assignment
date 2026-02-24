import { Link } from 'react-router-dom';
import { formatINR, calcDiscount } from '../lib/api';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, index }) {
  const discount = calcDiscount(product.mrp, product.price);

  return (
    <Link
      to={`/products/${product.slug}`}
      className={styles.card}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={styles.imageWrap}>
        <img
          src={product.image_url}
          alt={product.name}
          className={styles.image}
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x400/F0EDE8/9A9590?text=${encodeURIComponent(product.brand)}`;
          }}
        />
        {discount > 0 && (
          <span className={styles.badge}>{discount}% off</span>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.brand}>{product.brand}</div>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.variant}>{product.variant_name}</div>

        <div className={styles.pricing}>
          <span className={styles.price}>{formatINR(product.price)}</span>
          {product.mrp > product.price && (
            <span className={styles.mrp}>{formatINR(product.mrp)}</span>
          )}
        </div>

        {product.min_emi && (
          <div className={styles.emiTeaser}>
            <span className={styles.emiIcon}>✦</span>
            EMI from <strong>{formatINR(product.min_emi)}/mo</strong> at 0% interest
          </div>
        )}

        <div className={styles.cta}>View EMI Plans →</div>
      </div>
    </Link>
  );
}
