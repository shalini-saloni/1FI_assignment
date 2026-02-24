require('dotenv').config();
const pool = require('./pool');
const fs = require('fs');
const path = require('path');

const products = [
  {
    name: 'iPhone 17 Pro',
    slug: 'iphone-17-pro',
    brand: 'Apple',
    category: 'Smartphones',
    description: 'The most powerful iPhone ever with A19 Pro chip, ProMotion display, and revolutionary camera system.',
    image_url: 'https://www.alasil.ae/cdn/shop/files/iphone17proorange3.webp?v=1767435184',
    variants: [
      {
        name: '256GB - Orange Titanium',
        storage: '256GB',
        color: 'Orange Titanium',
        color_hex: '#E8522A',
        mrp: 134900,
        price: 127400,
        image_url: 'https://www.alasil.ae/cdn/shop/files/iphone17proorange3.webp?v=1767435184',
        emi_plans: [
          { tenure_months: 3,  monthly_amount: 44967, interest_rate: 0,    cashback_amount: 7500, is_popular: false },
          { tenure_months: 6,  monthly_amount: 22483, interest_rate: 0,    cashback_amount: 7500, is_popular: false },
          { tenure_months: 12, monthly_amount: 11242, interest_rate: 0,    cashback_amount: 7500, is_popular: true  },
          { tenure_months: 24, monthly_amount: 5621,  interest_rate: 0,    cashback_amount: 7500, is_popular: false },
          { tenure_months: 36, monthly_amount: 4297,  interest_rate: 10.5, cashback_amount: 7500, is_popular: false },
          { tenure_months: 48, monthly_amount: 3385,  interest_rate: 10.5, cashback_amount: 7500, is_popular: false },
          { tenure_months: 60, monthly_amount: 2842,  interest_rate: 10.5, cashback_amount: 7500, is_popular: false },
        ],
      },
      {
        name: '256GB - Silver Titanium',
        storage: '256GB',
        color: 'Silver Titanium',
        color_hex: '#e0ddda',
        mrp: 134900,
        price: 127400,
        image_url: 'https://www.pakmobizone.pk/wp-content/uploads/2025/09/Apple-iPhone-17-Pro-Max-Silver-1.png',
        emi_plans: [
          { tenure_months: 3,  monthly_amount: 44967, interest_rate: 0,    cashback_amount: 7500, is_popular: false },
          { tenure_months: 6,  monthly_amount: 22483, interest_rate: 0,    cashback_amount: 7500, is_popular: false },
          { tenure_months: 12, monthly_amount: 11242, interest_rate: 0,    cashback_amount: 7500, is_popular: true  },
          { tenure_months: 24, monthly_amount: 5621,  interest_rate: 0,    cashback_amount: 7500, is_popular: false },
          { tenure_months: 36, monthly_amount: 4297,  interest_rate: 10.5, cashback_amount: 7500, is_popular: false },
          { tenure_months: 48, monthly_amount: 3385,  interest_rate: 10.5, cashback_amount: 7500, is_popular: false },
          { tenure_months: 60, monthly_amount: 2842,  interest_rate: 10.5, cashback_amount: 7500, is_popular: false },
        ],
      },
      {
        name: '512GB - Blue Titanium',
        storage: '512GB',
        color: 'Blue Titanium',
        color_hex: '#003366',
        mrp: 154900,
        price: 148900,
        image_url: 'https://media.power-cdn.net/images/h-3eca1e391217763cfe619bdfa2288868/products/4157297/4157297_2_600x600_t_g.webp',
        emi_plans: [
          { tenure_months: 3,  monthly_amount: 51633, interest_rate: 0,    cashback_amount: 5000, is_popular: false },
          { tenure_months: 6,  monthly_amount: 25817, interest_rate: 0,    cashback_amount: 5000, is_popular: false },
          { tenure_months: 12, monthly_amount: 12908, interest_rate: 0,    cashback_amount: 5000, is_popular: true  },
          { tenure_months: 24, monthly_amount: 6454,  interest_rate: 0,    cashback_amount: 5000, is_popular: false },
          { tenure_months: 36, monthly_amount: 4930,  interest_rate: 10.5, cashback_amount: 5000, is_popular: false },
          { tenure_months: 60, monthly_amount: 3250,  interest_rate: 10.5, cashback_amount: 5000, is_popular: false },
        ],
      },
    ],
  },
  {
    name: 'Samsung Galaxy S25 Ultra',
    slug: 'samsung-galaxy-s25-ultra',
    brand: 'Samsung',
    category: 'Smartphones',
    description: 'Galaxy AI is here. The most capable Galaxy S with Snapdragon 8 Elite, integrated S Pen, and 200MP camera.',
    image_url: 'https://pngdownload.io/wp-content/uploads/2025/02/Samsung-Galaxy-S25-Ultra-Titanium-Black-Premium-Smartphone.webp',
    variants: [
      {
        name: '256GB - Titanium Black',
        storage: '256GB',
        color: 'Titanium Black',
        color_hex: '#1A1A1A',
        mrp: 130999,
        price: 119999,
        image_url: 'https://pngdownload.io/wp-content/uploads/2025/02/Samsung-Galaxy-S25-Ultra-Titanium-Black-Premium-Smartphone.webp',
        emi_plans: [
          { tenure_months: 3,  monthly_amount: 41333, interest_rate: 0,    cashback_amount: 5000, is_popular: false },
          { tenure_months: 6,  monthly_amount: 20667, interest_rate: 0,    cashback_amount: 5000, is_popular: false },
          { tenure_months: 12, monthly_amount: 10333, interest_rate: 0,    cashback_amount: 5000, is_popular: true  },
          { tenure_months: 24, monthly_amount: 5167,  interest_rate: 0,    cashback_amount: 5000, is_popular: false },
          { tenure_months: 36, monthly_amount: 3950,  interest_rate: 10.5, cashback_amount: 5000, is_popular: false },
          { tenure_months: 48, monthly_amount: 3122,  interest_rate: 10.5, cashback_amount: 5000, is_popular: false },
          { tenure_months: 60, monthly_amount: 2615,  interest_rate: 10.5, cashback_amount: 5000, is_popular: false },
        ],
      },
      {
        name: '256GB - Titanium Silver Blue',
        storage: '256GB',
        color: 'Titanium Silver Blue',
        color_hex: '#B8C8D8',
        mrp: 130999,
        price: 119999,
        image_url: 'https://media.flixcar.com/webp/synd-asset/Samsung-290665128-ie-galaxy-s25-s938-sm-s938bzbheub-544816688--Download-Source--zoom.png',
        emi_plans: [
          { tenure_months: 3,  monthly_amount: 41333, interest_rate: 0,    cashback_amount: 5000, is_popular: false },
          { tenure_months: 6,  monthly_amount: 20667, interest_rate: 0,    cashback_amount: 5000, is_popular: false },
          { tenure_months: 12, monthly_amount: 10333, interest_rate: 0,    cashback_amount: 5000, is_popular: true  },
          { tenure_months: 24, monthly_amount: 5167,  interest_rate: 0,    cashback_amount: 5000, is_popular: false },
          { tenure_months: 36, monthly_amount: 3950,  interest_rate: 10.5, cashback_amount: 5000, is_popular: false },
          { tenure_months: 60, monthly_amount: 2615,  interest_rate: 10.5, cashback_amount: 5000, is_popular: false },
        ],
      },
      {
        name: '512GB - Titanium Whitesilver',
        storage: '512GB',
        color: 'Titanium Whitesilver',
        color_hex: '#F0EDE8',
        mrp: 150999,
        price: 139999,
        image_url: 'https://media.flixcar.com/webp/synd-asset/Samsung-290668272-ie-galaxy-s25-s938-sm-s938bzsdeub-544816840--Download-Source--zoom.png',
        emi_plans: [
          { tenure_months: 3,  monthly_amount: 48333, interest_rate: 0,    cashback_amount: 3000, is_popular: false },
          { tenure_months: 6,  monthly_amount: 24167, interest_rate: 0,    cashback_amount: 3000, is_popular: false },
          { tenure_months: 12, monthly_amount: 12083, interest_rate: 0,    cashback_amount: 3000, is_popular: true  },
          { tenure_months: 24, monthly_amount: 6042,  interest_rate: 0,    cashback_amount: 3000, is_popular: false },
          { tenure_months: 36, monthly_amount: 4617,  interest_rate: 10.5, cashback_amount: 3000, is_popular: false },
          { tenure_months: 60, monthly_amount: 3045,  interest_rate: 10.5, cashback_amount: 3000, is_popular: false },
        ],
      },
    ],
  },
  {
    name: 'OnePlus 13s',
    slug: 'oneplus-13s',
    brand: 'OnePlus',
    category: 'Smartphones',
    description: 'Snapdragon 8 Elite, Hasselblad camera system, 100W SUPERVOOC charging, and a stunning 2K AMOLED display.',
    image_url: 'https://image01-in.oneplus.net/media/202505/22/92023197f208cd7b3171b97377a4b90a.png',
    variants: [
      {
        name: '256GB - Green Silk',
        storage: '256GB',
        color: 'Green Silk',
        color_hex: '#008000c9',
        mrp: 72999,
        price: 69999,
        image_url: 'https://image01-in.oneplus.net/media/202505/22/92023197f208cd7b3171b97377a4b90a.png',
        emi_plans: [
          { tenure_months: 3,  monthly_amount: 23999, interest_rate: 0,    cashback_amount: 2000, is_popular: false },
          { tenure_months: 6,  monthly_amount: 12000, interest_rate: 0,    cashback_amount: 2000, is_popular: false },
          { tenure_months: 12, monthly_amount: 6000,  interest_rate: 0,    cashback_amount: 2000, is_popular: true  },
          { tenure_months: 18, monthly_amount: 4000,  interest_rate: 0,    cashback_amount: 2000, is_popular: false },
          { tenure_months: 24, monthly_amount: 3150,  interest_rate: 10.5, cashback_amount: 2000, is_popular: false },
          { tenure_months: 36, monthly_amount: 2208,  interest_rate: 10.5, cashback_amount: 2000, is_popular: false },
        ],
      },
      {
        name: '256GB - Black Velvet',
        storage: '256GB',
        color: 'Black Velvet',
        color_hex: '#111111',
        mrp: 72999,
        price: 69999,
        image_url: 'https://www.oneplus.com/content/dam/oneplus/na/2025/nav/Nav15RCharcoalBlack.png',
        emi_plans: [
          { tenure_months: 3,  monthly_amount: 23999, interest_rate: 0,    cashback_amount: 2000, is_popular: false },
          { tenure_months: 6,  monthly_amount: 12000, interest_rate: 0,    cashback_amount: 2000, is_popular: false },
          { tenure_months: 12, monthly_amount: 6000,  interest_rate: 0,    cashback_amount: 5000, is_popular: true  },
          { tenure_months: 24, monthly_amount: 3150,  interest_rate: 10.5, cashback_amount: 2000, is_popular: false },
          { tenure_months: 36, monthly_amount: 2208,  interest_rate: 10.5, cashback_amount: 2000, is_popular: false },
        ],
      },
      {
        name: '512GB - Pink Satin',
        storage: '512GB',
        color: 'Pink Satin',
        color_hex: '#FFC0CB',
        mrp: 82999,
        price: 79999,
        image_url: 'https://image01-in.oneplus.net/media/202505/22/fe39bc573b7c7c964f6b85088dfcaf8d.png',
        emi_plans: [
          { tenure_months: 3,  monthly_amount: 27333, interest_rate: 0,    cashback_amount: 1500, is_popular: false },
          { tenure_months: 6,  monthly_amount: 13667, interest_rate: 0,    cashback_amount: 1500, is_popular: false },
          { tenure_months: 12, monthly_amount: 6833,  interest_rate: 0,    cashback_amount: 1500, is_popular: true  },
          { tenure_months: 24, monthly_amount: 3583,  interest_rate: 10.5, cashback_amount: 1500, is_popular: false },
          { tenure_months: 36, monthly_amount: 2512,  interest_rate: 10.5, cashback_amount: 1500, is_popular: false },
        ],
      },
    ],
  },
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log('Starting seed...');
    
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await client.query(schema);
    
    await client.query('TRUNCATE emi_plans, variants, products RESTART IDENTITY CASCADE');
    
    for (const product of products) {
      const { rows: [p] } = await client.query(
        `INSERT INTO products (name, slug, brand, category, description, image_url)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [product.name, product.slug, product.brand, product.category, product.description, product.image_url]
      );
      console.log(`Product: ${product.name} (id=${p.id})`);
      
      for (const variant of product.variants) {
        const { rows: [v] } = await client.query(
          `INSERT INTO variants (product_id, name, storage, color, color_hex, mrp, price, image_url)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
          [p.id, variant.name, variant.storage, variant.color, variant.color_hex, variant.mrp, variant.price, variant.image_url]
        );
        console.log(`Variant: ${variant.name} (id=${v.id})`);
        
        for (const plan of variant.emi_plans) {
          await client.query(
            `INSERT INTO emi_plans (variant_id, tenure_months, monthly_amount, interest_rate, cashback_amount, is_popular)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [v.id, plan.tenure_months, plan.monthly_amount, plan.interest_rate, plan.cashback_amount, plan.is_popular]
          );
        }
        console.log(`Inserted ${variant.emi_plans.length} EMI plans`);
      }
    }
    
    console.log('Seed complete!');
  } catch (err) {
    console.error('Seed error:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(() => process.exit(1));
