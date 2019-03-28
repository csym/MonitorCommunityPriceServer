import { getLogger } from 'log4js';
import MonitoryTask from '../task/MonitoryTask';


const log = getLogger('routes/dispatch');

const express = require('express');

const router = express.Router();

/* 调度爬虫获取日数据 . */
router.get('/day', async (req, res) => {
  // res.send('respond with a resource');
  const result = {};
  try {
    log.info('MonitoryTask spiderCommunityPrice begin');
    await MonitoryTask.spiderCommunityPrice();
    log.info('MonitoryTask spiderCommunityPrice end');
    result.result = 0;
    result.message = 'suc';
    res.json(result);
  } catch (e) {
    result.result = 1;
    result.message = JSON.stringify(e);
    res.json(result);
  }
});

module.exports = router;
