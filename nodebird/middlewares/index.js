//이미 로그인한 사용자는 회원가입, 로그인 라우터에 접근하면 안됨
//라우터 접근을 제어하는 미들웨어를 만들어보자!
exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next(); //res.render가 있는 미들웨어로 넘어갈 수 있음
    } else {
        res.status(400).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};