const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3030;

app.use(cors());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: false }));

const reviews_data = JSON.parse(fs.readFileSync("./data/reviews.json", 'utf8'));
const dealerships_data = JSON.parse(fs.readFileSync("./data/dealerships.json", 'utf8'));

let reviews = reviews_data['reviews'];
let dealerships = dealerships_data['dealerships'];

// Express route to home
app.get('/', async (req, res) => {
  res.send("Welcome to the Mongoose API (Mocked)")
});

// Express route to fetch all reviews
app.get('/fetchReviews', async (req, res) => {
  res.json(reviews);
});

// Express route to fetch reviews by a particular dealer
app.get('/fetchReviews/dealer/:id', async (req, res) => {
  const dealerReviews = reviews.filter(r => r.dealership == req.params.id);
  res.json(dealerReviews);
});

// Express route to fetch all dealerships
app.get('/fetchDealers', async (req, res) => {
  res.json(dealerships);
});

// Express route to fetch Dealers by a particular state
app.get('/fetchDealers/:state', async (req, res) => {
  const stateDealers = dealerships.filter(d => d.state === req.params.state);
  res.json(stateDealers);
});

// Express route to fetch dealer by a particular id
app.get('/fetchDealer/:id', async (req, res) => {
  const dealer = dealerships.find(d => d.id == req.params.id);
  res.json(dealer);
});

//Express route to insert review
app.post('/insert_review', async (req, res) => {
  const data = req.body;
  const new_id = reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1;

  const review = {
    "id": new_id,
    "name": data['name'],
    "dealership": data['dealership'],
    "review": data['review'],
    "purchase": data['purchase'],
    "purchase_date": data['purchase_date'],
    "car_make": data['car_make'],
    "car_model": data['car_model'],
    "car_year": data['car_year'],
  };

  reviews.push(review);
  res.json(review);
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
