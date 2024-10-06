const express = require("express");
const router = express.Router();
const axios = require('axios');
const API_KEY = process.env.API_KEY;    // config.env에 openweahtermap API KEY 입력

router.get('/', async (req, res) => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${37.566535}&lon=${126.9779692}&appid=${API_KEY}`);
  res.json(response.data);
});

module.exports = router;