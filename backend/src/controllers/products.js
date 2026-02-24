const pool = require('../db/pool');

const getAllProducts = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT 
        p.id, p.name, p.slug, p.brand, p.category, p.description,
        v.id        AS variant_id,
        v.name      AS variant_name,
        v.price,
        v.mrp,
        v.image_url,
        v.color,
        v.color_hex,
        v.storage,
        (SELECT MIN(monthly_amount) FROM emi_plans WHERE variant_id = v.id AND interest_rate = 0) AS min_emi
      FROM products p
      JOIN variants v ON v.product_id = p.id
      WHERE v.id = (
        SELECT id FROM variants WHERE product_id = p.id ORDER BY id LIMIT 1
      )
      ORDER BY p.id
    `);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const { rows: products } = await pool.query(
      'SELECT * FROM products WHERE slug = $1',
      [slug]
    );
    if (!products.length) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    const product = products[0];

    const { rows: variants } = await pool.query(
      'SELECT * FROM variants WHERE product_id = $1 ORDER BY id',
      [product.id]
    );

    for (const variant of variants) {
      const { rows: emiPlans } = await pool.query(
        'SELECT * FROM emi_plans WHERE variant_id = $1 ORDER BY tenure_months',
        [variant.id]
      );
      variant.emi_plans = emiPlans;
    }

    product.variants = variants;

    res.json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const getVariantById = async (req, res) => {
  try {
    const { slug, variantId } = req.params;

    const { rows: products } = await pool.query(
      'SELECT id FROM products WHERE slug = $1',
      [slug]
    );
    if (!products.length) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const { rows: variants } = await pool.query(
      'SELECT * FROM variants WHERE id = $1 AND product_id = $2',
      [variantId, products[0].id]
    );
    if (!variants.length) {
      return res.status(404).json({ success: false, error: 'Variant not found' });
    }

    const variant = variants[0];
    const { rows: emiPlans } = await pool.query(
      'SELECT * FROM emi_plans WHERE variant_id = $1 ORDER BY tenure_months',
      [variant.id]
    );
    variant.emi_plans = emiPlans;

    res.json({ success: true, data: variant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

module.exports = { getAllProducts, getProductBySlug, getVariantById };
