// import MonitoryTask from '../task/MonitoryTask';
import CommunityPriceDayDao from '../dao/CommunityPriceDayDao';
import CommunityPriceMonDao from '../dao/CommunityPriceMonDao';
import CommunityMonitorDao from '../dao/CommunityMonitorDao';

const express = require('express');

const router = express.Router();

/* GET monitor listing. */
router.get('/', async (req, res) => {
  // res.send('respond with a resource');
  try {
    const result = await CommunityMonitorDao.findAllMonitoryCommunity();
    res.json(result);
  } catch (e) {
    const result = {};
    result.result = 1;
    result.message = JSON.stringify(e);
    res.json(result);
  }
});

/* GET monitor listing. */
router.get('/:aid', async (req, res) => {
  // res.send('respond with a resource');
  req.query.aid = req.params.aid;
  try {
    const monInfo = await CommunityPriceMonDao.findMonPrice(req.query);
    const dayInfo = await CommunityPriceDayDao.findDayPriceList(req.query);
    const result = {};
    result.monInfo = monInfo;
    result.dayInfo = dayInfo;
    res.json(result);
  } catch (e) {
    const result = {};
    result.result = 1;
    result.message = JSON.stringify(e);
    res.json(result);
  }
});

module.exports = router;
