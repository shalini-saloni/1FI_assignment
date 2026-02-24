import { formatINR } from '../lib/api';
import styles from './EMIPlanCard.module.css';

export default function EMIPlanCard({ plan, isSelected, onSelect }) {
  const isZero = parseFloat(plan.interest_rate) === 0;
  const total  = plan.monthly_amount * plan.tenure_months;

  return (
    <button
      className={`${styles.card} ${isSelected ? styles.selected : ''} ${plan.is_popular ? styles.popular : ''}`}
      onClick={() => onSelect(plan)}
    >
      {plan.is_popular && <span className={styles.popularBadge}>⭐ Most Popular</span>}

      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.emiAmount}>
            <span className={styles.amount}>{formatINR(plan.monthly_amount)}</span>
            <span className={styles.per}>/mo</span>
          </div>
          <div className={styles.tenure}>{plan.tenure_months} months</div>
        </div>

        <div className={styles.right}>
          <span className={isZero ? styles.zeroTag : styles.interestTag}>
            {isZero ? '0% Interest' : `${plan.interest_rate}% p.a.`}
          </span>
          {parseFloat(plan.cashback_amount) > 0 && (
            <span className={styles.cashback}>+{formatINR(plan.cashback_amount)} cashback</span>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <span>Total: {formatINR(total)}{!isZero ? ' (incl. interest)' : ''}</span>
        {isSelected && (
          <span className={styles.checkmark}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="7" fill="currentColor" opacity=".15"/>
              <path d="M4.5 7l2 2 3-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Selected
          </span>
        )}
      </div>
    </button>
  );
}
