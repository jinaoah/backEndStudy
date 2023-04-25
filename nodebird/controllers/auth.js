const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');

//회원 가입 컨트롤러
exports.join = async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        const exUser = await User.findOne({ where: {email} });
        if(exUser) {
            //이미 있다면 회원가입 페이지로 돌려보냄
            return res.redirect('/join?error=exist'); //주소 뒤에 쿼리스트링으로 에러 표시
        }
        //bcrypt 모듈의 hash함수는 프로미스를 지원
        //그래서, await를 사용함
        const hash = await bcrypt.hash(password, 12); //비밀번호 암호화
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/');
    } catch(error) {
        console.error(error);
        return next(error);
    }
};
//로그인 컨트롤러
exports.login = async (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if(!user) {
            return res.redirect(`/?loginError=${info.message}`);//Missing credentials
        }
        return req.login(user, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
};