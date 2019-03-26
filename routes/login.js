import { getLogger } from 'log4js';
import { login, auth } from '../utils/passport';

const log = getLogger('login');
const express = require('express');

const router = express.Router();

/* Post login. */
router.post('/', async (req, res) => {
  login(req, res);
});

router.get('/secret', auth('test'), ((req, res) => {
  res.json('Success! You can not see this without a token');
}));

router.get('/secretDebug', ((req, res, next) => {
  log.debug(req.get('Authorization'));
  next();
}), ((req, res) => {
    res.json('debugging');
  }));
module.exports = router;
