import { getLogger } from 'log4js';
import CommunityPriceDayDao from '../dao/CommunityPriceDayDao';
import CommunityPriceMonDao from '../dao/CommunityPriceMonDao';
import CommunityMonitorDao from '../dao/CommunityMonitorDao';

const moment = require('moment');

const log = getLogger('task/MonitoryTask');
const superagent = require('superagent');
// const cheerio = require('cheerio');

// const pages = [
//   { url: 'https://shanghai.anjuke.com/community/view/118522', name: '繁荣安居', aid: '118522' },
//   { url: 'https://shanghai.anjuke.com/community/view/610707', name: '繁荣华庭', aid: '610707' },
// ];

const spiderCommunityPrice = async () => {
  log.info('getCommunityPriceDay begin');
  const lists = await CommunityMonitorDao.findAllMonitoryCommunity();
  console.log(`all monitor community ${JSON.stringify(lists)}`);
  lists.forEach(async (item) => {
    // const { url } = item;
    log.info(`get page info begin, name:${item.name}`);
    const priceData = await getComView(item);
    log.info(`get page priceData:${priceData}`);
    if (priceData) {
      const writeDayRes = await writePriceDay(priceData, item);
      log.info(`get page writeRes:${JSON.stringify(writeDayRes)}`);
      const writeMonRes = await writePriceMon(priceData, item);
      log.info(`get page writeRes:${JSON.stringify(writeMonRes)}`);
    }
    log.info(`get page info end, name:${item.name}`);
  });
};

const getComView = async (item) => {
  console.log(`getComurl: ${item.url}`);

  const info = await new Promise((resolve) => {
    superagent.get(item.url).end(async (err, res) => {
      if (err) {
        // 如果访问失败或者出错，会这行这里
        log.error(`获取信息失败 - ${err} ${item.url}`);
        resolve(null);
      } else {
        // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res
        const str = res.text;
        const pos1 = str.indexOf('data : {');
        if (pos1 > 0) {
          const newStr = str.substr(pos1 + 7, str.length - pos1 - 7);
          const pos2 = newStr.indexOf('ajaxUrl');
          if (pos2 > 0) {
            const newStr2 = newStr.substr(0, pos2 - 14);
            // console.log(`res: ${newStr2}`);
            resolve(newStr2);
          } else {
            log.error(`获取信息失败 - ${pos2} ${item.url}`);
            resolve(null);
          }
        } else {
          log.error(`获取信息失败 - ${pos1} ${item.url}`);
          resolve(null);
        }
      }
    });
  });
  return info;
};

const writePriceDay = async (priceData, communityInfo) => {
  const priceObj = JSON.parse(priceData);

  // 写入信息到日表
  const info = {};
  info.name = communityInfo.name;
  info.aid = communityInfo.aid;
  info.sumday = moment().format('YYYYMMDD');
  info.price = priceObj.comm_midprice;
  info.trend = priceObj.comm_midchange;
  const res = await CommunityPriceDayDao.insertCommunityPrice(info);
  return res;
};

const writePriceMon = async (priceData, communityInfo) => {
  // 写入信息到日表
  const info = {};
  info.name = communityInfo.name;
  info.aid = communityInfo.aid;
  info.communityprice = priceData;
  const res = await CommunityPriceMonDao.insertCommunityPrice(info);
  return res;
};

export default {
  spiderCommunityPrice,
};
