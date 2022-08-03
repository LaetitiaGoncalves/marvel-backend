const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

require("dotenv").config();
const axios = require("axios");

app.use(express.json());
//récupérer la liste des comics dans l'API MARVEL

app.get("/", async (req, res) => {
  const apikey = process.env.API_KEY;
  const url = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apikey}`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: "no" });
  }
});

app.all("*", (req, res) => {
  console.log("route not found");
  res.status(404).json({ message: "route not found !" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
