const BASE_URL = import.meta.env.VITE_API_URL || '/api';

async function apiFetch(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  const { data } = await res.json();
  return data;
}

export const api = {
  getProducts: ()                        => apiFetch('/products'),
  getProduct:  (slug)                    => apiFetch(`/products/${slug}`),
  getVariant:  (slug, variantId)         => apiFetch(`/products/${slug}/variants/${variantId}`),
};

export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calcDiscount(mrp, price) {
  return Math.round(((mrp - price) / mrp) * 100);
}
