const express = require('express');
const router = express.Router();
const { getListings } = require('../middleware/repliers');

router.get('/', async (req, res) => {
  const data = await getListings({ resultsPerPage: 6 });
  res.render('pages/home', { title: 'Rajivan Varatharajah – Bastrop Real Estate', listings: data.listings || [] });
});

router.get('/about', (req, res) => {
  res.render('pages/about', { title: 'About Rajivan – Rajivan Varatharajah Real Estate' });
});

router.get('/home-valuation', (req, res) => {
  res.render('pages/valuation', { title: 'Home Valuation – Rajivan Varatharajah Real Estate' });
});

router.get('/neighborhoods', (req, res) => {
  res.render('pages/neighborhoods', { title: 'Neighborhoods – Rajivan Varatharajah Real Estate' });
});

router.get('/testimonials', (req, res) => {
  res.render('pages/testimonials', { title: 'Testimonials – Rajivan Varatharajah Real Estate' });
});

router.get('/buyers-guide', (req, res) => {
  res.render('pages/buyers-guide', { title: "Buyer's Guide – Rajivan Varatharajah Real Estate" });
});

router.get('/sellers-guide', (req, res) => {
  res.render('pages/sellers-guide', { title: "Seller's Guide – Rajivan Varatharajah Real Estate" });
});

router.get('/mortgage-calculator', (req, res) => {
  res.render('pages/mortgage', { title: 'Mortgage Calculator – Rajivan Varatharajah Real Estate' });
});

router.get('/resources', (req, res) => {
  res.render('pages/resources', { title: 'Resources – Rajivan Varatharajah Real Estate' });
});

router.get('/blog', (req, res) => {
  res.render('pages/blog', { title: 'Blog – Rajivan Varatharajah Real Estate' });
});

router.get('/vlog', (req, res) => {
  res.render('pages/vlog', { title: 'Vlog – Rajivan Varatharajah Real Estate' });
});

router.get('/contact', (req, res) => {
  res.render('pages/contact', { title: "Let's Connect – Rajivan Varatharajah Real Estate" });
});

router.get('/search-portal', (req, res) => {
  res.render('pages/search-portal', {
    title: 'My Search Portal – Rajivan Varatharajah Real Estate',
    gmapsKey: process.env.GMAPS_KEY,
  });
});

router.get('/home-search', (req, res) => {
  res.render('pages/home-search', {
    title: 'Home Search – Rajivan Varatharajah Real Estate',
    gmapsKey: process.env.GMAPS_KEY,
  });
});

module.exports = router;
