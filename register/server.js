//Node.js용 오픈 소스 웹 애플리케이션 프레임워크
//express를 사용하면 개발자가 특정 URL 및 HTTP 메서드에 매핑되는 일련의 경로 정의
const express = require('express'); 
const path = require('path');
const app = express();

//Node.js 애플리케이션이 시작될 때 수신할 포트 번호를 설정
app.set('port', process.env.PORT || 3000);

app.get('', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})