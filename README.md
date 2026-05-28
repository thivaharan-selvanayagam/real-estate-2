# Rajivan Varatharajah – Real Estate Website

A Node.js / Express / EJS real estate website for Rajivan Varatharajah, powered by the Repliers MLS API.

## Pages

| Page | Route |
|------|-------|
| Home | `/` |
| About Rajivan | `/about` |
| Our Listings | `/listings` |
| Home Search | `/home-search` |
| Home Valuation | `/home-valuation` |
| Neighborhoods | `/neighborhoods` |
| Testimonials | `/testimonials` |
| Buyer's Guide | `/buyers-guide` |
| Seller's Guide | `/sellers-guide` |
| Mortgage Calculator | `/mortgage-calculator` |
| Resources | `/resources` |
| Blog | `/blog` |
| Vlog | `/vlog` |
| Let's Connect | `/contact` |
| My Search Portal | `/search-portal` |

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables** — edit `.env`:
   ```
   REPLIERS_API_KEY=your_repliers_api_key
   REPLIERS_BASE_URL=https://api.repliers.io
   GMAPS_KEY=your_google_maps_key
   PORT=3000
   ```

3. **Start the server:**
   ```bash
   # Production
   npm start

   # Development (auto-restart)
   npm run dev
   ```

4. **Open** `http://localhost:3000`

## Project Structure

```
rajivan-real-estate/
├── server.js               # Express app entry point
├── package.json
├── .env                    # Environment variables
├── routes/
│   ├── index.js            # Main page routes
│   ├── listings.js         # Listings routes
│   └── api.js              # API routes (search, contact)
├── middleware/
│   └── repliers.js         # Repliers MLS API wrapper
├── views/
│   ├── partials/
│   │   ├── header.ejs      # Global header + nav
│   │   ├── footer.ejs      # Global footer
│   │   └── listing-card.ejs
│   └── pages/
│       ├── home.ejs
│       ├── about.ejs
│       ├── listings.ejs
│       ├── listing-detail.ejs
│       ├── home-search.ejs
│       ├── valuation.ejs
│       ├── neighborhoods.ejs
│       ├── testimonials.ejs
│       ├── buyers-guide.ejs
│       ├── sellers-guide.ejs
│       ├── mortgage.ejs
│       ├── resources.ejs
│       ├── blog.ejs
│       ├── vlog.ejs
│       ├── contact.ejs
│       ├── search-portal.ejs
│       └── 404.ejs
└── public/
    ├── css/
    │   ├── global.css      # Base design system
    │   └── site.css        # Component styles
    ├── js/
    │   └── main.js         # Client-side JS
    └── images/             # Local image assets
```
