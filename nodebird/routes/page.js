const express = require('express');
const { renderProfile, renderJoin, renderMain } = require('../controllers/page');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const router = express.Router();

//res.locals로 값을 설정하는 이유는 모든 템플릿 엔진에서 공통으로 사용하기 때문
router.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.follwingIdList = [];
    next();
});
//isLoggedIn 미들웨어 사용
//get : http 함수
router.get('/profile', isLoggedIn, renderProfile); //자신의 프로필은 로그인을 해야 볼 수 있음
router.get('/join', isNotLoggedIn, renderJoin);
router.get('/', renderMain);

module.exports = router;