const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());
//récupérer la liste des comics dans l'API MARVEL

const apikey = process.env.API_KEY;

app.get("/", (req, res) => {
  res.status(500).json("welcome to my backend");
});

//Route contenant tous les comics

app.get("/comics", async (req, res) => {
  try {
    const url = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apikey}`;
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

//Route contenant tous les personnages

app.get("/characters", async (req, res) => {
  try {
    const url = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apikey}`;
    const response = await axios(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

// Route contenant les infos sur un personnage par Id

// app.get("/characters/:characterId", async (req, res) => {
//   try {
//     const url = `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${apikey}`;
//     const response = await axios.get(url);
//     res.status(200).json(response.data);
//     console.log(req.params);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// Route contenant les comics d'un personnage

app.get("/character/:id", async (req, res) => {
  try {
    const url = `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.id}?apiKey=${apikey}`;
    const response = await axios.get(url);
    res.status(200).json(response.data);
    console.log(req.params);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "route not found !" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
