const passport = require('passport');
const local = require('./localStrategy');
// const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    //serializeUser : 사용자 정보 객체에서 아이디만 추려 세션에 저장함.
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    //id == user.id, 
    //session에서 아이디를 통해 사용자 정보 객체를 리턴함
    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id }})
            .then(user => done(null, user)) //req.user에 저장
            .catch(err => done(err))
    });

    local();
    // kakao();
}