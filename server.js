const express = require("express");
const app = express();

require("dotenv").config();
const axios = require("axios");

app.use(express.json());
//récupérer la liste des comics dans l'API MARVEL

app.get("/comics", async (req, res) => {
  const apikey = process.env.API_KEY;
  const url = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apikey}`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: "Page not found" });
  }
});

app.all("*", function (req, res) {
  res.status(400).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
