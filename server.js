const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());
//récupérer la liste des comics dans l'API MARVEL

app.get("/", (req, res) => {
  res.status(500).json("welcome");
});

app.get("/comics", async (req, res) => {
  const apikey = process.env.API_KEY;
  const url = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apikey}`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.all("*", (req, res) => {
  console.log("route not found");
  res.status(404).json({ message: "route not found !" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
