import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '60vh', textAlign: 'center',
      padding: '40px 24px', gap: 16
    }}>
      <div style={{ fontSize: 80, lineHeight: 1 }}>404</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800 }}>
        Page not found
      </h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 360 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" style={{
        background: 'var(--accent)', color: 'white',
        padding: '12px 28px', borderRadius: 99,
        fontSize: 14, fontWeight: 600, marginTop: 8
      }}>
        Go to Homepage
      </Link>
    </div>
  );
}
