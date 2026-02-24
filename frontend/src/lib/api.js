const BASE_URL = import.meta.env.VITE_API_URL || '/api';

// ─── Mirrors seed.js exactly — used when backend is offline ──────────────────
const FALLBACK = [
  {
    id: 1,
    name: 'iPhone 17 Pro',
    slug: 'iphone-17-pro',
    brand: 'Apple',
    category: 'Smartphones',
    variant_name: '256GB - Orange Titanium',
    price: 127400, mrp: 134900, min_emi: 11242,
    image_url: 'https://www.alasil.ae/cdn/shop/files/iphone17proorange3.webp?v=1767435184',
    variants: [
      {
        id: 1, name: '256GB - Orange Titanium',
        storage: '256GB', color: 'Orange Titanium', color_hex: '#E8522A',
        mrp: 134900, price: 127400,
        image_url: 'https://www.alasil.ae/cdn/shop/files/iphone17proorange3.webp?v=1767435184',
        emi_plans: [
          { id: 1,  tenure_months: 3,  monthly_amount: 44967, interest_rate: '0',    cashback_amount: '7500', is_popular: false },
          { id: 2,  tenure_months: 6,  monthly_amount: 22483, interest_rate: '0',    cashback_amount: '7500', is_popular: false },
          { id: 3,  tenure_months: 12, monthly_amount: 11242, interest_rate: '0',    cashback_amount: '7500', is_popular: true  },
          { id: 4,  tenure_months: 24, monthly_amount: 5621,  interest_rate: '0',    cashback_amount: '7500', is_popular: false },
          { id: 5,  tenure_months: 36, monthly_amount: 4297,  interest_rate: '10.5', cashback_amount: '7500', is_popular: false },
          { id: 6,  tenure_months: 48, monthly_amount: 3385,  interest_rate: '10.5', cashback_amount: '7500', is_popular: false },
          { id: 7,  tenure_months: 60, monthly_amount: 2842,  interest_rate: '10.5', cashback_amount: '7500', is_popular: false },
        ],
      },
      {
        id: 2, name: '256GB - Silver Titanium',
        storage: '256GB', color: 'Silver Titanium', color_hex: '#e0ddda',
        mrp: 134900, price: 127400,
        image_url: 'https://www.pakmobizone.pk/wp-content/uploads/2025/09/Apple-iPhone-17-Pro-Max-Silver-1.png',
        emi_plans: [
          { id: 8,  tenure_months: 3,  monthly_amount: 44967, interest_rate: '0',    cashback_amount: '7500', is_popular: false },
          { id: 9,  tenure_months: 6,  monthly_amount: 22483, interest_rate: '0',    cashback_amount: '7500', is_popular: false },
          { id: 10, tenure_months: 12, monthly_amount: 11242, interest_rate: '0',    cashback_amount: '7500', is_popular: true  },
          { id: 11, tenure_months: 24, monthly_amount: 5621,  interest_rate: '0',    cashback_amount: '7500', is_popular: false },
          { id: 12, tenure_months: 36, monthly_amount: 4297,  interest_rate: '10.5', cashback_amount: '7500', is_popular: false },
          { id: 13, tenure_months: 48, monthly_amount: 3385,  interest_rate: '10.5', cashback_amount: '7500', is_popular: false },
          { id: 14, tenure_months: 60, monthly_amount: 2842,  interest_rate: '10.5', cashback_amount: '7500', is_popular: false },
        ],
      },
      {
        id: 3, name: '512GB - Blue Titanium',
        storage: '512GB', color: 'Blue Titanium', color_hex: '#003366',
        mrp: 154900, price: 148900,
        image_url: 'https://media.power-cdn.net/images/h-3eca1e391217763cfe619bdfa2288868/products/4157297/4157297_2_600x600_t_g.webp',
        emi_plans: [
          { id: 15, tenure_months: 3,  monthly_amount: 51633, interest_rate: '0',    cashback_amount: '5000', is_popular: false },
          { id: 16, tenure_months: 6,  monthly_amount: 25817, interest_rate: '0',    cashback_amount: '5000', is_popular: false },
          { id: 17, tenure_months: 12, monthly_amount: 12908, interest_rate: '0',    cashback_amount: '5000', is_popular: true  },
          { id: 18, tenure_months: 24, monthly_amount: 6454,  interest_rate: '0',    cashback_amount: '5000', is_popular: false },
          { id: 19, tenure_months: 36, monthly_amount: 4930,  interest_rate: '10.5', cashback_amount: '5000', is_popular: false },
          { id: 20, tenure_months: 60, monthly_amount: 3250,  interest_rate: '10.5', cashback_amount: '5000', is_popular: false },
        ],
      },
    ],
  },

  {
    id: 2,
    name: 'Samsung Galaxy S25 Ultra',
    slug: 'samsung-galaxy-s25-ultra',
    brand: 'Samsung',
    category: 'Smartphones',
    variant_name: '256GB - Titanium Black',
    price: 119999, mrp: 130999, min_emi: 10333,
    image_url: 'https://images.ctfassets.net/evnrpfa1vdk4/5kDbd7OkOzqS8i7FpnyC5C/f75811fefad3854c2b1defcb6fce1be9/sm-s938_galaxys25ultra_front_titaniumblack_241107.png',
    variants: [
      {
        id: 4, name: '256GB - Titanium Black',
        storage: '256GB', color: 'Titanium Black', color_hex: '#1A1A1A',
        mrp: 130999, price: 119999,
        image_url: 'https://images.ctfassets.net/evnrpfa1vdk4/5kDbd7OkOzqS8i7FpnyC5C/f75811fefad3854c2b1defcb6fce1be9/sm-s938_galaxys25ultra_front_titaniumblack_241107.png',
        emi_plans: [
          { id: 21, tenure_months: 3,  monthly_amount: 41333, interest_rate: '0',    cashback_amount: '5000', is_popular: false },
          { id: 22, tenure_months: 6,  monthly_amount: 20667, interest_rate: '0',    cashback_amount: '5000', is_popular: false },
          { id: 23, tenure_months: 12, monthly_amount: 10333, interest_rate: '0',    cashback_amount: '5000', is_popular: true  },
          { id: 24, tenure_months: 24, monthly_amount: 5167,  interest_rate: '0',    cashback_amount: '5000', is_popular: false },
          { id: 25, tenure_months: 36, monthly_amount: 3950,  interest_rate: '10.5', cashback_amount: '5000', is_popular: false },
          { id: 26, tenure_months: 48, monthly_amount: 3122,  interest_rate: '10.5', cashback_amount: '5000', is_popular: false },
          { id: 27, tenure_months: 60, monthly_amount: 2615,  interest_rate: '10.5', cashback_amount: '5000', is_popular: false },
        ],
      },
      {
        id: 5, name: '256GB - Titanium Silver Blue',
        storage: '256GB', color: 'Titanium Silver Blue', color_hex: '#B8C8D8',
        mrp: 130999, price: 119999,
        image_url: 'https://images.samsung.com/is/image/samsung/p6pim/my/2501/gallery/my-galaxy-s25-s938-sm-s938bzbbxme-544707394',
        emi_plans: [
          { id: 28, tenure_months: 3,  monthly_amount: 41333, interest_rate: '0',    cashback_amount: '5000', is_popular: false },
          { id: 29, tenure_months: 6,  monthly_amount: 20667, interest_rate: '0',    cashback_amount: '5000', is_popular: false },
          { id: 30, tenure_months: 12, monthly_amount: 10333, interest_rate: '0',    cashback_amount: '5000', is_popular: true  },
          { id: 31, tenure_months: 24, monthly_amount: 5167,  interest_rate: '0',    cashback_amount: '5000', is_popular: false },
          { id: 32, tenure_months: 36, monthly_amount: 3950,  interest_rate: '10.5', cashback_amount: '5000', is_popular: false },
          { id: 33, tenure_months: 60, monthly_amount: 2615,  interest_rate: '10.5', cashback_amount: '5000', is_popular: false },
        ],
      },
      {
        id: 6, name: '512GB - Titanium Whitesilver',
        storage: '512GB', color: 'Titanium Whitesilver', color_hex: '#F0EDE8',
        mrp: 150999, price: 139999,
        image_url: 'https://www.att.com/scmsassets/global/devices/phones/samsung/samsung-galaxy-s25-ultra/carousel/titanium-gray-1.png',
        emi_plans: [
          { id: 34, tenure_months: 3,  monthly_amount: 48333, interest_rate: '0',    cashback_amount: '3000', is_popular: false },
          { id: 35, tenure_months: 6,  monthly_amount: 24167, interest_rate: '0',    cashback_amount: '3000', is_popular: false },
          { id: 36, tenure_months: 12, monthly_amount: 12083, interest_rate: '0',    cashback_amount: '3000', is_popular: true  },
          { id: 37, tenure_months: 24, monthly_amount: 6042,  interest_rate: '0',    cashback_amount: '3000', is_popular: false },
          { id: 38, tenure_months: 36, monthly_amount: 4617,  interest_rate: '10.5', cashback_amount: '3000', is_popular: false },
          { id: 39, tenure_months: 60, monthly_amount: 3045,  interest_rate: '10.5', cashback_amount: '3000', is_popular: false },
        ],
      },
    ],
  },

  {
    id: 3,
    name: 'OnePlus 13s',
    slug: 'oneplus-13s',
    brand: 'OnePlus',
    category: 'Smartphones',
    variant_name: '256GB - Green Silk',
    price: 69999, mrp: 72999, min_emi: 6000,
    image_url: 'https://image01-in.oneplus.net/media/202505/22/92023197f208cd7b3171b97377a4b90a.png',
    variants: [
      {
        id: 7, name: '256GB - Green Silk',
        storage: '256GB', color: 'Green Silk', color_hex: '#008000',
        mrp: 72999, price: 69999,
        image_url: 'https://image01-in.oneplus.net/media/202505/22/92023197f208cd7b3171b97377a4b90a.png',
        emi_plans: [
          { id: 40, tenure_months: 3,  monthly_amount: 23999, interest_rate: '0',    cashback_amount: '2000', is_popular: false },
          { id: 41, tenure_months: 6,  monthly_amount: 12000, interest_rate: '0',    cashback_amount: '2000', is_popular: false },
          { id: 42, tenure_months: 12, monthly_amount: 6000,  interest_rate: '0',    cashback_amount: '2000', is_popular: true  },
          { id: 43, tenure_months: 18, monthly_amount: 4000,  interest_rate: '0',    cashback_amount: '2000', is_popular: false },
          { id: 44, tenure_months: 24, monthly_amount: 3150,  interest_rate: '10.5', cashback_amount: '2000', is_popular: false },
          { id: 45, tenure_months: 36, monthly_amount: 2208,  interest_rate: '10.5', cashback_amount: '2000', is_popular: false },
        ],
      },
      {
        id: 8, name: '256GB - Black Velvet',
        storage: '256GB', color: 'Black Velvet', color_hex: '#111111',
        mrp: 72999, price: 69999,
        image_url: 'https://www.oneplus.com/content/dam/oneplus/na/2025/nav/Nav15RCharcoalBlack.png',
        emi_plans: [
          { id: 46, tenure_months: 3,  monthly_amount: 23999, interest_rate: '0',    cashback_amount: '2000', is_popular: false },
          { id: 47, tenure_months: 6,  monthly_amount: 12000, interest_rate: '0',    cashback_amount: '2000', is_popular: false },
          { id: 48, tenure_months: 12, monthly_amount: 6000,  interest_rate: '0',    cashback_amount: '5000', is_popular: true  },
          { id: 49, tenure_months: 24, monthly_amount: 3150,  interest_rate: '10.5', cashback_amount: '2000', is_popular: false },
          { id: 50, tenure_months: 36, monthly_amount: 2208,  interest_rate: '10.5', cashback_amount: '2000', is_popular: false },
        ],
      },
      {
        id: 9, name: '512GB - Pink Satin',
        storage: '512GB', color: 'Pink Satin', color_hex: '#FFC0CB',
        mrp: 82999, price: 79999,
        image_url: 'https://image01-in.oneplus.net/media/202505/22/fe39bc573b7c7c964f6b85088dfcaf8d.png',
        emi_plans: [
          { id: 51, tenure_months: 3,  monthly_amount: 27333, interest_rate: '0',    cashback_amount: '1500', is_popular: false },
          { id: 52, tenure_months: 6,  monthly_amount: 13667, interest_rate: '0',    cashback_amount: '1500', is_popular: false },
          { id: 53, tenure_months: 12, monthly_amount: 6833,  interest_rate: '0',    cashback_amount: '1500', is_popular: true  },
          { id: 54, tenure_months: 24, monthly_amount: 3583,  interest_rate: '10.5', cashback_amount: '1500', is_popular: false },
          { id: 55, tenure_months: 36, monthly_amount: 2512,  interest_rate: '10.5', cashback_amount: '1500', is_popular: false },
        ],
      },
    ],
  },
];

// ─── API helpers ─────────────────────────────────────────────────────────────
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
  getProducts: async () => {
    try {
      return await apiFetch('/products');
    } catch {
      return FALLBACK.map(p => ({
        id: p.id, name: p.name, slug: p.slug, brand: p.brand,
        category: p.category, variant_name: p.variant_name,
        price: p.price, mrp: p.mrp, image_url: p.image_url, min_emi: p.min_emi,
      }));
    }
  },
  getProduct: async (slug) => {
    try {
      return await apiFetch(`/products/${slug}`);
    } catch {
      const p = FALLBACK.find(x => x.slug === slug);
      if (!p) throw new Error('Product not found');
      return p;
    }
  },
};

// ─── Utilities ───────────────────────────────────────────────────────────────
export function formatINR(n) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(n);
}

export function calcDiscount(mrp, price) {
  return Math.round(((mrp - price) / mrp) * 100);
}
