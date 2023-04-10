const router = require('express').Router();
const pool = require('../database/config');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));

router.post('/register', (req, res) => {
    const [id, email, name, password] = req.body;
    console.log(req.body);
    pool.getConnection()
        .then(conn => {
            conn.query('INSERT INTO membertbl SET ?', {id, email, name, password});
            conn.release();
            res.send(`<script type="text/javascript">alert("${name}님 환영합니다!"); document.location.href="/";</script>`);
        })
        .catch(err => {
            console.log("DB 연결 실패 : " + err);
            res.status(500).send('서버 오류');
            conn.release();
        })
    // pool.end();
});

module.exports = router;