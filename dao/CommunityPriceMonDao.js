import { getLogger } from 'log4js';

const log = getLogger('dao/CommunityPriceMonDao');
const db = require('../models/index');

async function findMonPrice(info) {
  const { aid } = info;
  const priceInfo = await db.t_community_price_month.findOne({
    where: { aid },
    attributes: ['id', 'aid', 'name', 'communityprice', 'createtime'],
    raw: true,
    logging: sql => log.debug('[findMonPrice] - ', sql),
  });
  return priceInfo;
}

async function insertCommunityPrice(info) {
  const {
    name,
    aid,
    communityprice,
  } = info;
  try {
    // 删除已有记录
    let res = await db.t_community_price_month.destroy({
      where: {
        aid,
      },
    }, {
      logging: sql => log.debug('[destroyCommunityPrice] - ', sql),
    });

    res = await db.t_community_price_month.create({
      name,
      aid,
      communityprice,
      updatetime: new Date(),
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
  findMonPrice,
  insertCommunityPrice,
};
