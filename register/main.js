//Node.js용 오픈 소스 웹 애플리케이션 프레임워크
//express를 사용하면 개발자가 특정 URL 및 HTTP 메서드에 매핑되는 일련의 경로 정의
const express = require('express');
const pool = require('../database/config');
const app = express();
let registerRouter = require('./userRegister');
// const bodyParser = require('body-parser');

app.use(express.json());
//URL-encoded : 주소 형식으로 데이터를 보내는 방식
app.use(express.urlencoded( {extended: true} ));
//Node.js 애플리케이션이 시작될 때 수신할 포트 번호를 설정
app.set('port', process.env.PORT || 3000);

app.get('', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//ERROR!!) req.body를 콘솔에 찍어보면 undefined가 나옴
//회원가입, membertbl 테이블에 접근하여 입력받은 데이터를 삽입
app.use('/register', registerRouter);

app.post('/register', (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    const email = req.body.email;
    const pw = req.body.pw;
    const name = req.body.name;
    // 날짜 만들기
    let date = new Date();
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    let dateStr = year + '-' + month  + '-' + day;

    pool.getConnection()
        .then(conn => {
            let sql = `INSERT INTO membertbl VALUES (?,?,?,?,?)`;
            conn.query(sql, [id, email, pw, name, dateStr], (err, result) => {
                if(err) throw err;
            });
            conn.release(); //연결 풀 반환
            res.send(`<script type="text/javascript">alert("${name}님 환영합니다!"); document.location.href="/";</script>`);
        })
        .catch(err => {
            console.log("DB 연결 실패 : " + err);
            res.status(500).send('서버 오류');
        })
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중...');
})
