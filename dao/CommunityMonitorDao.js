import { getLogger } from 'log4js';

const log = getLogger('dao/CommunityMonitorDao');
const db = require('../models/index');

async function findAllMonitoryCommunity() {
  try {
    const lists = await db.t_community_monitor.findAll({
      where: { validflag: 1 },
      attributes: ['id', 'name', 'aid', 'url', 'area', 'town'],
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

export default {
  findAllMonitoryCommunity,
};
