import { getLogger } from 'log4js';

// const schedule = require('node-schedule');
// import { db } from '../models/index';
const db = require('../models/index');

const log = getLogger('dao/UserInfoDao');

/*
schedule.scheduleJob('10 * * * * *', () => {
  console.log('test scheduleJob 123');
  log.info('callSendSmsTask begin');
});
*/

async function findByUsername(username) {
  const userInfo = await db.t_user_info.findOne({
    where: { username },
    attributes: ['userid', 'username', 'password'],
    raw: true,
    logging: sql => log.debug('[findByUsername] - ', sql),
  });
  return userInfo;
}

async function findByUserid(userid) {
  const userInfo = await db.t_user_info.findOne({
    where: { userid },
    attributes: ['userid', 'username', 'password'],
    raw: true,
    logging: sql => log.debug('[findByUserid] - ', sql),
  });
  return userInfo;
}

async function getUser(username) {
  try {
    const userInfo = await findByUsername(username);
    if (!userInfo) {
      log.warn('[getUser Warn] - Wrong username: ', username);
      return null;
    }
    const currentAuthority = 'user';
    userInfo.currentAuthority = currentAuthority;
    return userInfo;
  } catch (e) {
    log.error('[getUser] - Error:', e);
    return null;
  }
}

async function checkUser(userid, authority) {
  try {
    log.info(`authority ${authority}`);
    // 增加权限校验
    const userInfo = await findByUserid(userid);
    if (!userInfo) {
      log.warn('[getUser Warn] - Wrong userid: ', userid);
      return null;
    }
    return userInfo;
  } catch (e) {
    log.error('[getUser] - Error:', e);
    return null;
  }
}

export default {
  getUser,
  checkUser,
};
