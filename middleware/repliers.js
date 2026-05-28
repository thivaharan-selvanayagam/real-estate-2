const axios = require('axios');

const BASE = process.env.REPLIERS_BASE_URL || 'https://api.repliers.io';
const KEY  = process.env.REPLIERS_API_KEY;

const headers = {
  'REPLIERS-API-KEY': KEY,
  'Content-Type': 'application/json',
};

/**
 * Internal helper to safely diagnose and log API vs. Network errors.
 * Ensures you see the exact reason Repliers rejected a query.
 */
function logApiError(context, error) {
  if (error.response && error.response.data) {
    console.error(`🚨 Repliers API Error [${context}]:`, JSON.stringify(error.response.data, null, 2));
  } else {
    console.error(`🌐 Repliers Network/Timeout Error [${context}]:`, error.message);
  }
}

async function getListings(params = {}) {
  try {
    // 1. Establish robust query baseline configuration
    const mergedParams = {
      listings: true,
      status: 'A',
      pageNum: 1,
      resultsPerPage: 12,
      ...params,
    };

    // 2. Defensive Type-Casting Guardrails
    // Explicitly forces values passed from frontend queries to become proper integers
    if (mergedParams.pageNum) {
      mergedParams.pageNum = parseInt(mergedParams.pageNum, 10) || 1;
    }
    if (mergedParams.resultsPerPage) {
      mergedParams.resultsPerPage = parseInt(mergedParams.resultsPerPage, 10) || 12;
    }

    const res = await axios.get(`${BASE}/listings`, {
      headers,
      params: mergedParams,
    });
    
    return res.data;
  } catch (e) {
    logApiError('getListings', e);
    // Graceful error fallback prevents rendering engine crashes
    return { listings: [], count: 0 };
  }
}

async function getListing(mlsNum) {
  try {
    // 3. Early parameter sanitization guard
    if (!mlsNum || mlsNum === 'undefined') {
      console.warn('⚠️ getListing execution halted: Missing or invalid MLS Number parameter.');
      return null;
    }

    const res = await axios.get(`${BASE}/listings/${mlsNum}`, { headers });
    return res.data;
  } catch (e) {
    logApiError(`getListing (MLS #${mlsNum})`, e);
    return null;
  }
}

async function searchListings(params = {}) {
  // Retains alias connection map to protect routes/api.js logic architecture
  return getListings(params);
}

module.exports = { getListings, getListing, searchListings };