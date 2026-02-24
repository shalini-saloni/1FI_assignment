const express = require('express');
const router = express.Router();
const { getAllProducts, getProductBySlug, getVariantById } = require('../controllers/products');

router.get('/', getAllProducts);

router.get('/:slug', getProductBySlug);

router.get('/:slug/variants/:variantId', getVariantById);

module.exports = router;
