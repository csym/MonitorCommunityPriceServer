import { getLogger } from 'log4js';

const log = getLogger('dao/CommunityMonitorDao');
const db = require('../models/index');

async function findAllMonitoryCommunity(info) {
  try {
    const filter = {};
    filter.validflag = 1;
    if (info && info.city) {
      filter.city = info.city;
    }

    const lists = await db.t_community_monitor.findAll({
      where: filter,
      attributes: ['id', 'name', 'aid', 'url', 'city', 'area', 'town'],
      raw: true,
      logging: sql => log.debug('[findAllMonitoryCommunity] - ', sql),
    });
    const res = {};
    res.list = lists;
    res.pagination = { total: lists.length, pageSize: 10, current: 1 };
    return res;
  } catch (error) {
    log.error(`findAllMonitoryCommunity error ${JSON.stringify(error)}`);
  }
  return null;
}

async function isMonitoryCommunityExist(info) {
  try {
    const { aid, city } = info;
    const res = await db.t_community_monitor.findOne({
      where: { validflag: 1, aid, city },
      raw: true,
      logging: sql => log.debug('[isMonitoryCommunityExist] - ', sql),
    });

    log.debug(`isMonitoryCommunityExist aid: ${aid}, res:${JSON.stringify(res)}`);
    if (res && res.id) {
      return true;
    }
    return false;
  } catch (error) {
    log.error(`isMonitoryCommunityExist error ${JSON.stringify(error)}`);
  }
  return false;
}

async function addMonitoryCommunity(info) {
  const {
    name,
    aid,
    url,
    city,
    area,
    town,
  } = info;
  try {
    // 查看是否已存在
    // 创建
    const res = await db.t_community_monitor.create({
      name,
      aid,
      url,
      city,
      area,
      town,
      createtime: new Date(),
      validflag: 1,
    }, {
      logging: sql => log.debug('[addMonitoryCommunity] - ', sql),
    });
    return res;
  } catch (error) {
    log.error(`addMonitoryCommunity error ${JSON.stringify(error)}`);
  }
  return null;
}

export default {
  findAllMonitoryCommunity,
  isMonitoryCommunityExist,
  addMonitoryCommunity,
};
