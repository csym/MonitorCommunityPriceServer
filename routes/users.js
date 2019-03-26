const express = require('express');

const router = express.Router();


/* GET users listing. */
router.get('/', async (req, res) => {
  // res.send('respond with a resource');
  try {
    const result = {};
    res.json(result);
  } catch (e) {
    const result = {};
    result.result = 1;
    result.message = JSON.stringify(e);
    res.json(result);
  }
});

module.exports = router;
