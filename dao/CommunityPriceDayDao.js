import { getLogger } from 'log4js';

const moment = require('moment');

const log = getLogger('dao/CommunityPriceDayDao');
const db = require('../models/index');

async function findDayPriceList(info) {
  const { aid } = info;
  const condition = {};
  if (aid) {
    condition.aid = {
      $eq: aid,
    };
  }

  // 获取30年内的数据
  const begintime = moment().subtract(30, 'days');
  const gte = {
    $gte: begintime,
  };
  condition.createtime = gte;

  const results = await db.t_community_price_day.findAll({
    attributes: ['id', 'aid', 'name', 'sumday', 'price', 'salecnt', 'trend', 'createtime'],
    where: condition,
    raw: true,
    logging: sql => log.debug('[findDayPriceList Sql] - ', sql),
  });
  return results;
}

async function insertCommunityPrice(info) {
  const {
    name,
    aid,
    sumday,
    price,
    trend,
  } = info;
  try {
    // 删除已有记录
    let res = await db.t_community_price_day.destroy({
      where: {
        aid,
        sumday,
      },
    }, {
      logging: sql => log.debug('[destroyCommunityPrice] - ', sql),
    });
    // 创建
    res = await db.t_community_price_day.create({
      name,
      aid,
      sumday,
      price,
      trend,
      createtime: new Date(),
    }, {
      logging: sql => log.debug('[insertCommunityPrice] - ', sql),
    });
    return res;
  } catch (error) {
    log.error(`insertCommunityPrice error ${JSON.stringify(error)}`);
  }
  return null;
}

export default {
  findDayPriceList,
  insertCommunityPrice,
};
