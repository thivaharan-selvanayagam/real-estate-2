const express = require('express');
const router = express.Router();
const { searchListings } = require('../middleware/repliers');

router.get('/listings', async (req, res) => {
  const {
    q, minPrice, maxPrice, beds, baths, type,
    page = 1, limit = 12,
  } = req.query;

  const params = {
    pageNum: parseInt(page),
    resultsPerPage: parseInt(limit),
  };

  if (q) params.search = q;
  if (minPrice) params.minPrice = minPrice;
  if (maxPrice) params.maxPrice = maxPrice;
  if (beds) params.minBeds = beds;
  if (baths) params.minBaths = baths;
  if (type) params.class = type;

  const data = await searchListings(params);
  res.json({ listings: data.listings || [], count: data.count || 0 });
});

router.post('/contact', (req, res) => {
  // In production: send email via nodemailer/sendgrid
  const { name, email, phone, message } = req.body;
  console.log('Contact form:', { name, email, phone, message });
  res.json({ success: true, message: 'Thank you! Rajivan will be in touch shortly.' });
});

module.exports = router;
