import { getLogger } from 'log4js';
import CommunityPriceDayDao from '../dao/CommunityPriceDayDao';
import CommunityPriceMonDao from '../dao/CommunityPriceMonDao';
import CommunityMonitorDao from '../dao/CommunityMonitorDao';

const log = getLogger('routes/monitor');
const express = require('express');

const router = express.Router();

/* GET monitor listing. */
router.get('/', async (req, res) => {
  // res.send('respond with a resource');
  log.debug(`req.query: ${JSON.stringify(req.query)}`);
  try {
    const result = await CommunityMonitorDao.findAllMonitoryCommunity(req.query);
    res.json(result);
  } catch (e) {
    const result = {};
    result.result = 1;
    result.message = JSON.stringify(e);
    res.json(result);
  }
});

/* post add monitor. */
router.post('/', async (req, res) => {
  try {
    log.debug(`req.body: ${JSON.stringify(req.body)}`);
    const { aid, city } = req.body;
    let result = {};
    const flag = await CommunityMonitorDao.isMonitoryCommunityExist({ aid, city });
    if (!flag) {
      // 插入操作
      result = await CommunityMonitorDao.addMonitoryCommunity(req.body);
    } else {
      // 已插入 提示
      result.msg = '已插入';
      result.status = 'ok';
    }
    res.json(result);
  } catch (e) {
    const result = {};
    result.result = 1;
    result.message = JSON.stringify(e);
    res.json(result);
  }
});

/* GET monitor detail. */
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
