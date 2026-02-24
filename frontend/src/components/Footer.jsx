import { Link } from 'react-router-dom';

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function BankIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="22" x2="21" y2="22" /><line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" /><line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" /><polygon points="12 2 20 7 4 7" />
    </svg>
  );
}
function PercentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
}
function TruckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="container footer-top-inner">
          <div className="footer-logo">
            <div className="footer-logo-box">
              <svg width="30" height="22" viewBox="0 0 30 22" fill="none">
                <text x="0" y="19" fontFamily="'Syne',sans-serif" fontSize="18" fontWeight="800" fill="white">1Fi</text>
              </svg>
            </div>
            <div>
              <div className="footer-logo-name">1Fi Smart EMI</div>
              <div className="footer-logo-sub">India's smartest EMI platform</div>
            </div>
          </div>
          <div className="footer-trust-chips">
            {[
              { Icon: ShieldIcon, text: 'SSL Secured' },
              { Icon: BankIcon, text: 'RBI Regulated' },
              { Icon: PercentIcon, text: '0% Interest' },
              { Icon: TruckIcon, text: 'Free Delivery' },
            ].map(({ Icon, text }) => (
              <div key={text} className="footer-chip">
                <Icon /> {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="container footer-main-grid">
          <div>
            <div className="footer-col-title">Products</div>
            {[
              ['iPhone 17 Pro', '/products/iphone-17-pro'],
              ['Samsung Galaxy S25 Ultra', '/products/samsung-galaxy-s25-ultra'],
              ['OnePlus 13s', '/products/oneplus-13s'],
            ].map(([label, to]) => (
              <Link key={label} to={to} className="footer-link">{label}</Link>
            ))}
          </div>
          <div>
            <div className="footer-col-title">EMI Plans</div>
            {['3 Month — 0% Interest', '12 Month — 0% Interest', '24 Month — 0% Interest', '36–60 Month Plans'].map(t => (
              <div key={t} className="footer-link">{t}</div>
            ))}
          </div>
          <div>
            <div className="footer-col-title">Support</div>
            {['How it works', 'FAQs', 'Track Order', 'Contact Us'].map(t => (
              <div key={t} className="footer-link">{t}</div>
            ))}
          </div>
          <div>
            <div className="footer-col-title">Why 1Fi?</div>
            <div style={{ marginBottom: 22 }}>
              <div className="footer-stat-num" style={{ fontSize: 38 }}>0%</div>
              <div className="footer-stat-label">Interest on select plans</div>
            </div>
            <div>
              <div className="footer-stat-num" style={{ fontSize: 30 }}>₹7,500</div>
              <div className="footer-stat-label">Max cashback per order</div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span className="footer-copy">© 2025 1Fi Smart EMI · All rights reserved</span>
          <span className="footer-built">Built for 1Fi Full Stack Developer Assignment</span>
        </div>
      </div>
    </footer>
  );
}
