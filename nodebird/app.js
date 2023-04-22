const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config(); //.env 연결
const pageRouter = require('./routes/page');
const app = express();

app.set('port', process.env.port || 8001); //포트 번호 설정값
app.set('view engine', 'html');
//nunjucks.configure 기능은 Nunjucks가 views 디렉토리에서 템플릿을 찾도록 설정하는 데 사용
nunjucks.configure('views', {
    express: app,
    watch: true,
})

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); //JSON 요청을 구문 분석하고 구문 분석된 데이터 req.body
app.use(express.urlencoded({extended:false})); //false이므로 queryString 모듈 사용
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    //saveUninitialized : 세션에 저장할 내역이 없어도 세션 생성할 것인가?
    saveUninitialized: false, 
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true, //클라이언트에서 쿠키를 확인하지 못함
        secure: false,
    },
}));

app.use('/', pageRouter);
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
})

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
})