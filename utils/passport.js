import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import { getLogger } from 'log4js';
import userInfoDao from '../dao/UserInfoDao';

const log = getLogger('util/passport');

const jwtOptions = {
  passReqToCallback: true,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: 'server',
};

const strategy = new Strategy(jwtOptions, ((req, jwtPayload, next) => {
  // console.log('payload received', jwtPayload);
  log.debug(`[auth start] jwtPayload: ${jwtPayload}`);
  userInfoDao.checkUser(jwtPayload.id, req.authority)
    .then((user) => {
      if (user) {
        log.debug('[auth end]');
        next(null, user);
      } else {
        next(null, false);
      }
    });
}));

passport.use(strategy);

function login(req, res) {
  const { username, password } = req.body;
  userInfoDao.getUser(username)
    .then((user) => {
      if (!user) {
        res.json({
          status: 'error',
          help: '用户不存在',
        });
      } else if (user.password !== password) {
        res.json({
          status: 'error',
          help: '密码错误',
        });
      } else {
        // from now on we'll identify the user by the id and the id is the only
        // personalized value that goes into our token
        const payload = { id: user.userid };
        const token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: '1 days' });
        log.info('[Login] - ', user.username);
        res.json({
          status: 'ok',
          id: user.id,
          name: user.username,
          token,
          privilege: user.privilege,
        });
      }
    });
}

const auth = authority => (req, res, next) => {
  // 这里可以增加其他权限控制
  req.authority = authority;
  passport.authenticate('jwt', { session: false })(req, res, next);
};

export { login, auth };
export default passport;
