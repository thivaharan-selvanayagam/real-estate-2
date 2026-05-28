require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/index'));
app.use('/listings', require('./routes/listings'));
app.use('/api', require('./routes/api'));

// 404
app.use((req, res) => {
  res.status(404).render('pages/404', { title: '404 – Page Not Found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rajivan Real Estate running on http://localhost:${PORT}`));
