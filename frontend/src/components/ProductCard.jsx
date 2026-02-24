import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatINR, calcDiscount } from '../lib/api';
import styles from './ProductCard.module.css';

const FALLBACK_IMGS = {
  Apple: 'https://www.mobileana.com/wp-content/uploads/2025/06/Apple-iPhone-17-Pro-Max-Cosmic-Orange.webp',
  Samsung: 'https://vsprod.vijaysales.com/media/catalog/product/s/a/samsung-galaxy-s25-ultra-jetblack_1__1.jpg?optimize=medium&fit=bounds&height=500&width=500',
  OnePlus: 'https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:450/one-plus/494581934/0/Pb4_yJ7wwF-6ZY4cDKzRny-OnePlus-13s-494581934-i-1-1200Wx1200H.jpeg',
};

export default function ProductCard({ product, index }) {
  const [imgErr, setImgErr] = useState(false);
  const discount = calcDiscount(product.mrp, product.price);
  const zeroEmi = product.min_emi;

  return (
    <Link
      to={`/products/${product.slug}`}
      className={styles.card}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Image */}
      <div className={styles.imageWrap}>
        {discount > 0 && <span className={styles.discBadge}>{discount}% off</span>}
        <div className={styles.imageInner}>
          {!imgErr ? (
            <img
              src={product.image_url || product.variants?.[0]?.image_url}
              alt={product.name}
              className={styles.image}
              onError={() => setImgErr(true)}
            />
          ) : (
            <div className={styles.imgFallback}>
              <span className={styles.imgFallbackBrand}>{product.brand}</span>
              <span className={styles.imgFallbackModel}>{product.name}</span>
            </div>
          )}
        </div>
        <div className={styles.imageGlow} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.brand}>{product.brand}</span>
          <span className={styles.category}>{product.category}</span>
        </div>

        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.variant}>{product.variant_name}</div>

        <div className={styles.pricing}>
          <span className={styles.price}>{formatINR(product.price)}</span>
          {product.mrp > product.price && (
            <span className={styles.mrp}>{formatINR(product.mrp)}</span>
          )}
        </div>

        {zeroEmi && (
          <div className={styles.emiTeaser}>
            <div className={styles.emiTeaserLeft}>
              <span className={styles.emiIcon}>✦</span>
              <span>EMI from <strong>{formatINR(zeroEmi)}/mo</strong></span>
            </div>
            <span className={styles.emiZero}>0% Interest</span>
          </div>
        )}

        <div className={styles.cta}>
          <span>View EMI Plans</span>
          <span className={styles.ctaArrow}>→</span>
        </div>
      </div>
    </Link>
  );
}
