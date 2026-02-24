import { formatINR } from '../lib/api';
import styles from './EMIPlanCard.css';

export default function EMIPlanCard({ plan, isSelected, onSelect }) {
  const totalAmount = plan.monthly_amount * plan.tenure_months;
  const isZeroInterest = plan.interest_rate === 0 || plan.interest_rate === '0.00';

  return (
    <button
      className={`${styles.card} ${isSelected ? styles.selected : ''} ${plan.is_popular ? styles.popular : ''}`}
      onClick={() => onSelect(plan)}
    >
      {plan.is_popular && (
        <span className={styles.popularBadge}>Most Popular</span>
      )}

      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.emi}>
            <span className={styles.amount}>{formatINR(plan.monthly_amount)}</span>
            <span className={styles.per}>/mo</span>
          </div>
          <div className={styles.tenure}>{plan.tenure_months} months</div>
        </div>

        <div className={styles.right}>
          {isZeroInterest ? (
            <span className={styles.zeroInterest}>0% Interest</span>
          ) : (
            <span className={styles.interestRate}>{plan.interest_rate}% p.a.</span>
          )}
          {parseFloat(plan.cashback_amount) > 0 && (
            <span className={styles.cashback}>
              + {formatINR(plan.cashback_amount)} cashback
            </span>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        Total: {formatINR(totalAmount)}
        {!isZeroInterest && (
          <span className={styles.extra}> (incl. interest)</span>
        )}
      </div>

      {isSelected && (
        <div className={styles.selectedIndicator}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="8" fill="currentColor" opacity="0.15"/>
            <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </button>
  );
}
