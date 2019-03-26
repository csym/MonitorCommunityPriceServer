import { getLogger } from 'log4js';
import CommunityPriceDayDao from '../dao/CommunityPriceDayDao';
// const moment = require('moment');

const log = getLogger('task/MonitoryTask');
const superagent = require('superagent');
const cheerio = require('cheerio');

const pages = [
  { url: 'https://shanghai.anjuke.com/community/view/118522', name: '繁荣安居', aid: '118522' },
  // { url: 'https://shanghai.anjuke.com/community/view/610707', name: '繁荣华庭', aid: '610707' },
];

const getCommunityPriceDay = () => {
  log.info('getCommunityPriceDay begin');
  pages.forEach((item) => {
    // const { url } = item;
    getComView(item);
  });
};

const getCommunityPriceMon = () => {
  log.info('getCommunityPriceMon begin');
  const a = [];
  return a;
};

const getComView = (item) => {
  console.log(`getComurl: ${item.url}`);
  superagent.get(item.url).end((err, res) => {
    if (err) {
      // 如果访问失败或者出错，会这行这里
      console.log(`获取信息失败 - ${err} ${url}`);
    } else {
      // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res
      console.log('get response suc');
      console.log(`res: ${res.text}`);
      // const $ = cheerio.load(res.text);
      // $('.average').each((i, elem) => {
      //   const price = $(this).text();
      //   console.log(`${price}`);
      // });

      const str = res.text;
      const pos1 = str.indexOf('data : {');
      const newStr = str.substr(pos1 + 7, str.length - pos1 - 7);
      console.log(`pos1 ${pos1}`);
      const pos2 = newStr.indexOf('ajaxUrl');
      console.log(`pos2 ${pos2}`);
      const newStr2 = newStr.substr(0, pos2 - 14);
      console.log(`res: ${newStr2}`);

      const priceObj = JSON.parse(newStr2);

      //写入信息到日表
      const info = {};
      info.name = item.name;
      info.aid = item.aid;
      //info.sumday = moment().format('YYYYMMDD');
      info.price = priceObj.comm_midprice;
      info.trend = priceObj.comm_midchange;
      CommunityPriceDayDao.insertCommunityPrice(info);

      //写入信息到月表中

      const { community } = priceObj;
      console.log(community.length);
      console.log(community);
    }
  });
};

export default {
  getCommunityPriceDay,
  getCommunityPriceMon,
};
