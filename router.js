const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).end();
  res.status(200).json({ message: "From server"})
})

router.post('/match', (req, res) => {
  res.status(200).json({ message: "From server"})
})

module.exports = router;
