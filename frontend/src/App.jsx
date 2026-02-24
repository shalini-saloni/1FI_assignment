import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import './index.css';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="*" element={
            <div style={{ textAlign: 'center', padding: '100px 24px' }}>
              <h1 style={{ fontFamily: 'var(--font-d)', fontSize: 48, fontWeight: 800 }}>404</h1>
              <p style={{ color: '#9A9590', marginTop: 12 }}>Page not found</p>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
