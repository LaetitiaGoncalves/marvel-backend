const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

require("dotenv").config();
const axios = require("axios");

app.use(express.json());
//récupérer la liste des comics dans l'API MARVEL

const corsOptions = {
  origin: "https://laetitia-marvel-project.netlify.app/",
  optionsSuccessStatus: 200,
};

app.get("/comics", cors(corsOptions), async (req, res) => {
  const apikey = process.env.API_KEY;
  const url = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apikey}`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
    res.header(
      "Access-Control-Allow-Origin",
      "https://laetitia-marvel-project.netlify.app/"
    );
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
