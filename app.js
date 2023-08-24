const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/products");
const middleware = require("./middleware");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

mongoose.connect(
  "mongodb+srv://gretisvasquez:Edqvk4HpkIxWBLfM@cluster1.dic6ufh.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(bodyParser.json());

app.use(middleware.middleware);

app.use("/api/products", middleware.middleware, productRoutes);

app.get("/external", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
