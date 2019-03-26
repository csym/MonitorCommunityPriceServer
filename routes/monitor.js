import MonitoryTask from '../task/MonitoryTask';

const express = require('express');

const router = express.Router();

/* GET monitor listing. */
router.get('/', async (req, res) => {
  // res.send('respond with a resource');
  try {
    MonitoryTask.getCommunityPriceDay();
    const result = { msg: 'suc' };
    res.json(result);
  } catch (e) {
    const result = {};
    result.result = 1;
    result.message = JSON.stringify(e);
    res.json(result);
  }
});

module.exports = router;
