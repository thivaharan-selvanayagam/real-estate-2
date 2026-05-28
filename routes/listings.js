const express = require('express');
const router = express.Router();
const { getListings, getListing } = require('../middleware/repliers');

/**
 * GET /listings
 * Index view displaying paginated real estate property cards.
 */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    
    // Request data from our middleware wrapper feed safely
    const data = await getListings({ pageNum: page, resultsPerPage: 9 });
    const totalCount = data.count || 0;

    res.render('pages/listings', {
      title: 'Our Listings – Rajivan Varatharajah Real Estate',
      listings: data.listings || [],
      count: totalCount,
      page,
      totalPages: Math.ceil(totalCount / 9) || 1,
    });
  } catch (error) {
    console.error('🚨 Error inside listings index route handler:', error.message);
    
    // Graceful presentation fallback prevents compilation crash down the wire
    res.render('pages/listings', {
      title: 'Our Listings – Rajivan Varatharajah Real Estate',
      listings: [],
      count: 0,
      page: 1,
      totalPages: 1,
    });
  }
});

/**
 * GET /listings/:mlsNum
 * Detail view for individual properties.
 * * CRITICAL FIX: The ([^\\.]+) regular expression isolates this wildcard route. 
 * It forces Express to IGNORE any relative asset link requests containing a dot (like image.jpg).
 */
router.get('/:mlsNum([^\\.]+)', async (req, res) => {
  try {
    const { mlsNum } = req.params;
    const listing = await getListing(mlsNum);
    
    // If a valid MLS number is submitted but doesn't exist in the database feed, fallback
    if (!listing) {
      console.warn(`⚠️ Property MLS #${mlsNum} could not be resolved. Redirecting to index.`);
      return res.redirect('/listings');
    }
    
    res.render('pages/listing-detail', {
      title: `${listing.address?.streetNumber || ''} ${listing.address?.streetName || ''} – Rajivan Varatharajah Real Estate`,
      listing,
      gmapsKey: process.env.GMAPS_KEY,
    });
  } catch (error) {
    console.error(`🚨 Fatal breakdown handling property details lookup:`, error.message);
    res.redirect('/listings');
  }
});

module.exports = router;