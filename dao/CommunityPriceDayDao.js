import { getLogger } from 'log4js';

const log = getLogger('dao/CommunityPriceDayDao');
const db = require('../models/index');

async function findAllMonitoryCommunity() {
  const a = [];
  return a;
}

async function insertCommunityPrice(info) {
  const {
    name,
    aid,
    sumday,
    price,
    trend,
  } = info;
  const res = await db.t_community_price_day.create({
    name,
    aid,
    sumday,
    price,
    trend,
    createdate: new Date(),
  }, {
    logging: sql => log.debug('[insertCommunityPrice] - ', sql),
  });
  return res;
}

export default {
  findAllMonitoryCommunity,
  insertCommunityPrice,
};
