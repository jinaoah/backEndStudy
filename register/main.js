const express = require('express');
const app = express();
let registerRouter = require('./userRegister');

//Node.js 애플리케이션이 시작될 때 수신할 포트 번호를 설정
app.set('port', process.env.PORT || 3000);

app.get('', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//ERROR!!) req.body를 콘솔에 찍어보면 undefined가 나옴
//회원가입, membertbl 테이블에 접근하여 입력받은 데이터를 삽입
app.post('/register', registerRouter);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중...');
})
