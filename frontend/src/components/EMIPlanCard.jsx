import { formatINR } from '../lib/api';

export default function EMIPlanCard({ plan, isSelected, onSelect }) {
  const isZero = parseFloat(plan.interest_rate) === 0;
  const total = plan.monthly_amount * plan.tenure_months;

  let cls = 'emi-plan';
  if (isSelected) cls += ' selected';
  if (plan.is_popular) cls += ' popular';

  return (
    <button className={cls} onClick={() => onSelect(plan)}>
      {plan.is_popular && <div className="popular-banner">★ Most Popular</div>}

      <div className="emi-plan-body">
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
            <span className="emi-amount-num">{formatINR(plan.monthly_amount)}</span>
            <span className="emi-per">/mo</span>
          </div>
          <div className="emi-tenure">{plan.tenure_months} months</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
          {isZero
            ? <span className="emi-zero-tag">0% Interest</span>
            : <span className="emi-interest-tag">{plan.interest_rate}% p.a.</span>}
          {parseFloat(plan.cashback_amount) > 0 && (
            <span className="emi-cashback">+{formatINR(plan.cashback_amount)} cashback</span>
          )}
        </div>
      </div>

      <div className="emi-plan-foot">
        <span>Total: {formatINR(total)}{!isZero ? ' (incl. interest)' : ''}</span>
        {isSelected && (
          <span className="emi-selected-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Selected
          </span>
        )}
      </div>
    </button>
  );
}
