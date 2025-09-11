const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String
});

const Product = mongoose.model('Product', productSchema);

app.post('/api/products/setup', async (req, res) => {
  try {
    await Product.deleteMany({});
    const sampleProducts = [
      {name: 'T-shirt', price: 19.99, image: 'https://via.placeholder.com/150?text=T-shirt'},
      {name: 'Jeans', price: 49.99, image: 'https://via.placeholder.com/150?text=Jeans'},
      {name: 'Sneakers', price: 89.99, image: 'https://via.placeholder.com/150?text=Sneakers'}
    ];
    await Product.insertMany(sampleProducts);
    res.send("Sample products added");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
